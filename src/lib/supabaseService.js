import { supabase, isSupabaseConfigured } from './supabase';
import { INITIAL_EMPLOYEES } from '../data/employees';
import { INITIAL_PROJECTS } from '../data/projects';

/**
 * Fetch all employees from Supabase or fallback to INITIAL_EMPLOYEES
 */
export async function getEmployees() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: INITIAL_EMPLOYEES, isFromDb: false };
  }

  try {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.warn('Supabase fetch employees error, using local fallback:', error.message);
      return { data: INITIAL_EMPLOYEES, isFromDb: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return { data: INITIAL_EMPLOYEES, isFromDb: false, isEmpty: true };
    }

    return { data, isFromDb: true };
  } catch (err) {
    console.error('Failed to query Supabase employees:', err);
    return { data: INITIAL_EMPLOYEES, isFromDb: false, error: err.message };
  }
}

/**
 * Fetch all projects from Supabase or fallback to INITIAL_PROJECTS
 */
export async function getProjects() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: INITIAL_PROJECTS, isFromDb: false };
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.warn('Supabase fetch projects error, using local fallback:', error.message);
      return { data: INITIAL_PROJECTS, isFromDb: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return { data: INITIAL_PROJECTS, isFromDb: false, isEmpty: true };
    }

    return { data, isFromDb: true };
  } catch (err) {
    console.error('Failed to query Supabase projects:', err);
    return { data: INITIAL_PROJECTS, isFromDb: false, error: err.message };
  }
}

/**
 * Seed initial data into Supabase
 */
export async function seedInitialData() {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, message: 'Supabase is not configured yet.' };
  }

  try {
    // Upsert employees
    const { error: empError } = await supabase
      .from('employees')
      .upsert(INITIAL_EMPLOYEES, { onConflict: 'id' });

    if (empError) throw empError;

    // Upsert projects
    const { error: prjError } = await supabase
      .from('projects')
      .upsert(INITIAL_PROJECTS, { onConflict: 'id' });

    if (prjError) throw prjError;

    return { success: true, message: 'Successfully seeded employees and projects to Supabase!' };
  } catch (err) {
    console.error('Seed error:', err);
    return { success: false, message: err.message };
  }
}

/**
 * Update single employee
 */
export async function saveEmployee(employee) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from('employees').upsert(employee, { onConflict: 'id' });
  } catch (err) {
    console.error('Supabase save employee failed:', err);
  }
}

/**
 * Update multiple employees (e.g. after rebalancing)
 */
export async function saveEmployees(employeesList) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from('employees').upsert(employeesList, { onConflict: 'id' });
  } catch (err) {
    console.error('Supabase save employees failed:', err);
  }
}

/**
 * Update or save project
 */
export async function saveProject(project) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from('projects').upsert(project, { onConflict: 'id' });
  } catch (err) {
    console.error('Supabase save project failed:', err);
  }
}
