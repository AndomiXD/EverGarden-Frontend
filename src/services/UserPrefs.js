const STORAGE_KEY = "evergarden_profile_preferences"

export const loadPreferences = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export const savePreferences = (partial) => {
  const current = loadPreferences()
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...partial }))
}

export const clearPreferences = () => {
  localStorage.removeItem(STORAGE_KEY)
}
