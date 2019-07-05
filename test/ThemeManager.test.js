import { expect } from "chai"
import { JSDOM } from "jsdom"
import ThemeManager from "../client/helpers/ThemeManager.js"

describe("Libraries - Theme Manager", () => {
  before(() => {
    const { window } = new JSDOM(`<!DOCTYPE html><body></body>`, { url: "http://localhost/" })
    global.localStorage = window.localStorage
    global.Node = window.Node
  })

  it("can apply theme string on dom", () => {
    const testTheme = "testOk"

    const { window } = new JSDOM(`<!DOCTYPE html><body></body>`, { url: "http://localhost/" })
    const body = window.document.body
    const tm = new ThemeManager(body, { isPersistent: false })

    tm.applyTheme(testTheme)
    const result = body.getAttribute("data-theme")

    expect(result).to.equal(testTheme)
  })

  it("can keep theme persistent", () => {
    const testTheme = "testOk"
    const testPersistentKey = "test-key"

    const { window } = new JSDOM(`<!DOCTYPE html><body></body>`, { url: "http://localhost/" })
    const body = window.document.body
    const tm = new ThemeManager(body, {
      isPersistent: true,
      persistentKey: testPersistentKey,
      persistentStorage: window.localStorage
    })

    tm.applyTheme(testTheme)
    const result = window.localStorage.getItem(testPersistentKey)

    expect(result).to.equal(testTheme)
  })
})
