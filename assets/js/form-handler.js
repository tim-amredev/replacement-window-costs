document.addEventListener("DOMContentLoaded", () => {
  const quoteForm = document.getElementById("quote-form")
  const thankYouUrl = document.getElementById("thank-you-url")
  const estimatedPriceInput = document.getElementById("estimated-price")

  // Parse URL parameters and pre-fill form
  const urlParams = new URLSearchParams(window.location.search)

  if (urlParams.has("count")) {
    document.getElementById("window-count").value = urlParams.get("count")
  }

  if (urlParams.has("type")) {
    document.getElementById("window-type").value = urlParams.get("type")
  }

  if (urlParams.has("material")) {
    document.getElementById("frame-material").value = urlParams.get("material")
  }

  if (urlParams.has("size")) {
    document.getElementById("window-size").value = urlParams.get("size")
  }

  // Calculate initial price if parameters are present
  if (urlParams.has("price")) {
    estimatedPriceInput.value = urlParams.get("price")
  } else {
    updateEstimatedPrice()
  }

  // Update price when form fields change
  document.getElementById("window-count").addEventListener("change", updateEstimatedPrice)
  document.getElementById("window-type").addEventListener("change", updateEstimatedPrice)
  document.getElementById("frame-material").addEventListener("change", updateEstimatedPrice)
  document.getElementById("window-size").addEventListener("change", updateEstimatedPrice)

  // Handle form submission
  quoteForm.addEventListener("submit", (e) => {
    // Update the thank you URL with the estimated price
    const baseThankYouUrl = thankYouUrl.value.split("?")[0]
    const price = estimatedPriceInput.value

    thankYouUrl.value = `${baseThankYouUrl}?price=${price}`
  })

  function updateEstimatedPrice() {
    const windowCount = Number.parseInt(document.getElementById("window-count").value)
    const windowType = document.getElementById("window-type").value
    const frameMaterial = document.getElementById("frame-material").value
    const windowSize = document.getElementById("window-size").value

    // Calculate price using the same logic as the calculator
    const price = calculatePrice(windowCount, windowType, frameMaterial, windowSize)

    // Update hidden input
    estimatedPriceInput.value = price
  }

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

