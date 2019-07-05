class ThemeWhitelistError extends Error {
  constructor(themeName) {
    const message = `Theme name "${themeName}" is not in the whitelist`
    super(message)
    this.name = this.constructor.name
  }
}

class ThemeParametersError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

class ThemeManager {
  constructor(node, config = {}) {
    if (typeof node === "object" && node instanceof Node) {
      this.root = node
      this.isPersistent = config.isPersistent === true || config.isPersistent === undefined ? true : false
      this.persistentStorage = config.persistentStorage || localStorage
      this.persistentKey = config.persistentKey || "theme"
      this.validThemes = Array.isArray(config.whitelist) ? config.whitelist : []
      config.theme ? this.applyTheme(config.theme) : null
    } else {
      throw new ThemeParametersError("HTML element is required in parameter.")
    }
  }

  isValidTheme(themeName) {
    if (this.validThemes.length > 0) {
      return this.validThemes.some(x => x === themeName)
    } else {
      return true
    }
  }

  checkWhitelist(themeName) {
    if (!this.isValidTheme(themeName)) {
      throw new ThemeWhitelistError(themeName)
    }
  }

  saveAppliedTheme(themeName) {
    this.checkWhitelist(themeName)
    this.persistentStorage.setItem(this.persistentKey, themeName)
  }

  setPersistentStorage(storage) {
    this.persistentStorage = storage
  }

  getCurrentTheme() {
    return this.root.getAttribute("data-theme")
  }

  getPresistentTheme() {
    return this.persistentStorage.getItem(this.persistentKey)
  }

  applyPresistentTheme() {
    const theme = this.getPresistentTheme() || null
    if (theme !== null) {
      this.applyTheme(theme, true)
    }
  }

  applyTheme(themeName, isApplyOnly = false) {
    this.checkWhitelist(themeName)

    this.root.setAttribute("data-theme", themeName)
    this.currentTheme = themeName

    if (this.isPersistent === true && isApplyOnly === false) {
      this.saveAppliedTheme(themeName)
    }
  }
}

export default ThemeManager
