document.addEventListener("DOMContentLoaded", () => {
  const calculatorForm = document.getElementById("calculator-form")
  const calculatorResult = document.getElementById("calculator-result")
  const estimatedPrice = document.getElementById("estimated-price")
  const requestQuoteBtn = document.getElementById("request-quote-btn")
  const breakdownContainer = document.getElementById("price-breakdown")
  const windowCostElement = document.getElementById("window-cost")
  const installationCostElement = document.getElementById("installation-cost")
  const commissionElement = document.getElementById("commission")
  const totalCostElement = document.getElementById("total-cost")

  calculatorForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const windowCount = Number.parseInt(document.getElementById("window-count").value)
    const windowType = document.getElementById("window-type").value
    const frameMaterial = document.getElementById("frame-material").value
    const windowSize = document.getElementById("window-size").value
    const screenType = document.getElementById("screen-type").value
    const hasGrids = document.querySelector('input[name="grids"]:checked').value === "yes"

    // Calculate prices
    const { windowCost, installationCost, commission, totalPrice } = calculateDetailedPrice(
      windowCount,
      windowType,
      frameMaterial,
      windowSize,
      screenType,
      hasGrids,
    )

    // Display result with animation
    estimatedPrice.textContent = "$" + totalPrice.toLocaleString()

    // Update price breakdown
    windowCostElement.textContent = "$" + windowCost.toLocaleString()
    installationCostElement.textContent = "$" + installationCost.toLocaleString()
    commissionElement.textContent = "$" + commission.toLocaleString()
    totalCostElement.textContent = "$" + totalPrice.toLocaleString()

    calculatorResult.style.display = "block"
    breakdownContainer.style.display = "block"
    calculatorResult.classList.add("fadeIn")

    // Update request quote button URL
    const baseUrl = requestQuoteBtn.getAttribute("href").split("?")[0]
    const queryParams = new URLSearchParams({
      count: windowCount,
      type: windowType,
      material: frameMaterial,
      size: windowSize,
      screen: screenType,
      grids: hasGrids ? "yes" : "no",
      price: totalPrice,
    })

    requestQuoteBtn.setAttribute("href", `${baseUrl}?${queryParams.toString()}`)

    // Scroll to result
    calculatorResult.scrollIntoView({ behavior: "smooth" })
  })

  function calculateDetailedPrice(count, type, material, size, screenType, hasGrids) {
    // Base price per window
    let baseWindowPrice = 300

    // Adjustments for window type
    switch (type) {
      case "double-hung":
        baseWindowPrice += 0
        break
      case "casement":
        baseWindowPrice += 50
        break
      case "2-lite-slider":
        baseWindowPrice += 25
        break
      case "3-lite-slider":
        baseWindowPrice += 40
        break
      case "picture":
        baseWindowPrice += 75
        break
      case "bay":
        baseWindowPrice += 200
        break
      case "awning":
        baseWindowPrice += 60
        break
      case "hopper":
        baseWindowPrice += 40
        break
      case "garden":
        baseWindowPrice += 150
        break
    }

    // Adjustments for frame material
    switch (material) {
      case "vinyl":
        baseWindowPrice += 0
        break
      case "wood":
        baseWindowPrice += 100
        break
      case "fiberglass":
        baseWindowPrice += 150
        break
      case "aluminum":
        baseWindowPrice += 50
        break
      case "composite":
        baseWindowPrice += 125
        break
      case "wood-clad":
        baseWindowPrice += 175
        break
    }

    // Adjustments for window size
    switch (size) {
      case "small":
        baseWindowPrice += 0
        break
      case "medium":
        baseWindowPrice += 100
        break
      case "large":
        baseWindowPrice += 200
        break
    }

    // Adjustments for screen type
    switch (screenType) {
      case "none":
        baseWindowPrice += 0
        break
      case "half":
        baseWindowPrice += 25
        break
      case "full":
        baseWindowPrice += 50
        break
    }

    // Adjustments for grids
    if (hasGrids) {
      baseWindowPrice += 75
    }

    // Calculate window cost
    const windowCost = baseWindowPrice * count

    // Calculate installation cost (varies by type, material, and size)
    let baseInstallCost = 150 // Base installation cost per window

    // Installation adjustments for window type
    switch (type) {
      case "double-hung":
        baseInstallCost += 0
        break
      case "casement":
        baseInstallCost += 25
        break
      case "2-lite-slider":
        baseInstallCost += 15
        break
      case "3-lite-slider":
        baseInstallCost += 20
        break
      case "picture":
        baseInstallCost += 20
        break
      case "bay":
        baseInstallCost += 150
        break
      case "awning":
        baseInstallCost += 30
        break
      case "hopper":
        baseInstallCost += 20
        break
      case "garden":
        baseInstallCost += 100
        break
    }

    // Installation adjustments for material (some materials are harder to install)
    switch (material) {
      case "vinyl":
        baseInstallCost += 0
        break
      case "wood":
        baseInstallCost += 50
        break
      case "fiberglass":
        baseInstallCost += 75
        break
      case "aluminum":
        baseInstallCost += 25
        break
      case "composite":
        baseInstallCost += 60
        break
      case "wood-clad":
        baseInstallCost += 85
        break
    }

    // Installation adjustments for size
    switch (size) {
      case "small":
        baseInstallCost += 0
        break
      case "medium":
        baseInstallCost += 50
        break
      case "large":
        baseInstallCost += 100
        break
    }

    // Installation adjustments for screens
    switch (screenType) {
      case "none":
        baseInstallCost += 0
        break
      case "half":
        baseInstallCost += 10
        break
      case "full":
        baseInstallCost += 20
        break
    }

    // Installation adjustments for grids
    if (hasGrids) {
      baseInstallCost += 15
    }

    // Calculate total installation cost
    const installationCost = baseInstallCost * count

    // Calculate subtotal before commission
    const subtotal = windowCost + installationCost

    // Add commission (typically 15-20% in home improvement)
    const commissionRate = 0.18 // 18%
    const commission = Math.round(subtotal * commissionRate)

    // Calculate total price
    const totalPrice = subtotal + commission

    return {
      windowCost,
      installationCost,
      commission,
      totalPrice,
    }
  }
})
