document.addEventListener("DOMContentLoaded", () => {
  const calculatorForm = document.getElementById("calculator-form")
  const calculatorResult = document.getElementById("calculator-result")
  const estimatedPrice = document.getElementById("estimated-price")
  const requestQuoteBtn = document.getElementById("request-quote-btn")

  calculatorForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const windowCount = Number.parseInt(document.getElementById("window-count").value)
    const windowType = document.getElementById("window-type").value
    const frameMaterial = document.getElementById("frame-material").value
    const windowSize = document.getElementById("window-size").value

    // Calculate price
    const price = calculatePrice(windowCount, windowType, frameMaterial, windowSize)

    // Display result
    estimatedPrice.textContent = "$" + price.toLocaleString()
    calculatorResult.style.display = "block"

    // Update request quote button URL
    const baseUrl = requestQuoteBtn.getAttribute("href").split("?")[0]
    const queryParams = new URLSearchParams({
      count: windowCount,
      type: windowType,
      material: frameMaterial,
      size: windowSize,
      price: price,
    })

    requestQuoteBtn.setAttribute("href", `${baseUrl}?${queryParams.toString()}`)

    // Scroll to result
    calculatorResult.scrollIntoView({ behavior: "smooth" })
  })

  function calculatePrice(count, type, material, size) {
    // Base price per window
    let basePrice = 500

    // Adjustments for window type
    switch (type) {
      case "double-hung":
        basePrice += 0
        break
      case "casement":
        basePrice += 50
        break
      case "bay":
        basePrice += 200
        break
    }

    // Adjustments for frame material
    switch (material) {
      case "vinyl":
        basePrice += 0
        break
      case "wood":
        basePrice += 100
        break
      case "fiberglass":
        basePrice += 150
        break
    }

    // Adjustments for window size
    switch (size) {
      case "small":
        basePrice += 0
        break
      case "medium":
        basePrice += 100
        break
      case "large":
        basePrice += 200
        break
    }

    // Calculate total price
    return basePrice * count
  }
})

