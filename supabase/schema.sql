-- ============================================================
-- BraidVibe — Supabase Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard
-- ============================================================

-- 1. User Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar JSONB,
  is_pro BOOLEAN DEFAULT FALSE,
  pro_plan TEXT, -- 'weekly', 'monthly', 'annual'
  pro_expires_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tutorial Progress
CREATE TABLE IF NOT EXISTS tutorial_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tutorial_id INTEGER NOT NULL,
  completed_steps INTEGER[] DEFAULT '{}',
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, tutorial_id)
);

-- 3. Community Posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT,
  image_url TEXT,
  braid_type TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Post Comments
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Saved/Bookmarked Tutorials
CREATE TABLE IF NOT EXISTS saved_tutorials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tutorial_id INTEGER NOT NULL,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tutorial_id)
);

-- 6. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_tutorial_progress_user ON tutorial_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);

-- 7. Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutorial_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_tutorials ENABLE ROW LEVEL SECURITY;

-- Public read for posts
CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (true);

-- Users can insert their own posts
CREATE POLICY "Users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read for comments
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

-- Users can manage their own data
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Service role can do everything (for webhook)
CREATE POLICY "Service role full access profiles" ON profiles
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access progress" ON tutorial_progress
  FOR ALL USING (auth.role() = 'service_role');
