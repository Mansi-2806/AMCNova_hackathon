-- ==============================================================================
-- WorkforceIQ / AMC Nova Hackathon - Supabase Schema Setup
-- Run this in your Supabase Project Dashboard -> SQL Editor -> Click 'Run'
-- ==============================================================================

-- 1. Create EMPLOYEES Table
CREATE TABLE IF NOT EXISTS public.employees (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT,
    location TEXT,
    "totalExperience" NUMERIC,
    avatar TEXT,
    email TEXT,
    workload NUMERIC DEFAULT 0,
    availability NUMERIC DEFAULT 100,
    "availableHours" NUMERIC DEFAULT 40,
    "upcomingAvailabilityDate" TEXT,
    "leavePeriods" JSONB DEFAULT '[]'::jsonb,
    "activeProjects" JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    "projectHistory" JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create PROJECTS Table
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    client TEXT,
    description TEXT,
    status TEXT DEFAULT 'Active',
    stage TEXT,
    priority TEXT DEFAULT 'Medium',
    "startDate" TEXT,
    "endDate" TEXT,
    duration TEXT,
    "requiredTeamSize" NUMERIC,
    "assignedEmployees" JSONB DEFAULT '[]'::jsonb,
    "estimatedWorkloadPerPerson" NUMERIC,
    "requiredSkills" JSONB DEFAULT '[]'::jsonb,
    "readinessScore" NUMERIC DEFAULT 0,
    "readinessBreakdown" JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies to allow anonymous public access (ideal for hackathon / demo)
DROP POLICY IF EXISTS "Public Full Access on Employees" ON public.employees;
CREATE POLICY "Public Full Access on Employees"
    ON public.employees
    FOR ALL
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Public Full Access on Projects" ON public.projects;
CREATE POLICY "Public Full Access on Projects"
    ON public.projects
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 5. Enable Realtime (optional, for live updates across browser windows)
ALTER PUBLICATION supabase_realtime ADD TABLE public.employees;
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
