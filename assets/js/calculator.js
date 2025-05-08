document.addEventListener("DOMContentLoaded", () => {
  const calculatorForm = document.getElementById("calculator-form")
  const calculatorResult = document.getElementById("calculator-result")
  const requestQuoteBtn = document.getElementById("request-quote-btn")
  const breakdownContainer = document.getElementById("price-breakdown")
  const windowCostElement = document.getElementById("window-cost")
  const installationCostElement = document.getElementById("installation-cost")
  const commissionElement = document.getElementById("commission")
  const totalCostElement = document.getElementById("total-cost")
  const contactForm = document.getElementById("contact-form")
  const windowDetailsInput = document.getElementById("window-details")
  const estimatedPriceRangeInput = document.getElementById("estimated-price-range")
  const thankYouUrl = document.getElementById("thank-you-url")

  // Add input validation for phone and zip
  const phoneInput = document.getElementById("phone")
  const zipInput = document.getElementById("zip")
  const stateInput = document.getElementById("state")

  if (phoneInput) {
    // Phone validation - only allow numbers
    phoneInput.addEventListener("input", function (e) {
      // Remove any non-numeric characters
      this.value = this.value.replace(/\D/g, "")

      // Limit to 10 digits
      if (this.value.length > 10) {
        this.value = this.value.slice(0, 10)
      }
    })
  }

  if (zipInput) {
    // Zip code validation - only allow numbers
    zipInput.addEventListener("input", function (e) {
      // Remove any non-numeric characters
      this.value = this.value.replace(/\D/g, "")

      // Limit to 5 digits
      if (this.value.length > 5) {
        this.value = this.value.slice(0, 5)
      }
    })
  }

  if (stateInput) {
    // State code validation - force uppercase
    stateInput.addEventListener("input", function (e) {
      // Convert to uppercase
      this.value = this.value.toUpperCase()

      // Limit to 2 characters
      if (this.value.length > 2) {
        this.value = this.value.slice(0, 2)
      }

      // Only allow letters
      this.value = this.value.replace(/[^A-Z]/g, "")
    })
  }

  // Modify the event listener for form submission to show a price range instead of a breakdown
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
    const { totalPrice } = calculateDetailedPrice(
      windowCount,
      windowType,
      frameMaterial,
      windowSize,
      screenType,
      hasGrids,
    )

    // Calculate price range (20% below and above)
    const lowerPrice = Math.round(totalPrice * 0.8)
    const upperPrice = Math.round(totalPrice * 1.2)

    // Display result with animation
    const priceRangeElement = document.getElementById("price-range")
    priceRangeElement.textContent = `$${lowerPrice.toLocaleString()} - $${upperPrice.toLocaleString()}`

    // Hide breakdown container
    breakdownContainer.style.display = "none"

    // Show calculator result
    calculatorResult.style.display = "block"
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
      lowerPrice: lowerPrice,
      upperPrice: upperPrice,
    })

    requestQuoteBtn.setAttribute("href", `${baseUrl}?${queryParams.toString()}`)

    // Prepare window details for the contact form
    const windowDetails = `
      Number of Windows: ${windowCount}
      Window Type: ${windowType}
      Frame Material: ${frameMaterial}
      Window Size: ${windowSize}
      Screen Type: ${screenType}
      Grids/Muntins: ${hasGrids ? "Yes" : "No"}
      Estimated Price Range: $${lowerPrice.toLocaleString()} - $${upperPrice.toLocaleString()}
    `

    // Update hidden fields in the contact form
    if (windowDetailsInput) {
      windowDetailsInput.value = windowDetails
    }

    if (estimatedPriceRangeInput) {
      estimatedPriceRangeInput.value = `$${lowerPrice.toLocaleString()} - $${upperPrice.toLocaleString()}`
    }

    // Scroll to result
    calculatorResult.scrollIntoView({ behavior: "smooth" })
  })

  // Handle contact form submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Validate required fields
      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value
      const address = document.getElementById("address").value
      const city = document.getElementById("city").value
      const state = document.getElementById("state").value
      const zip = document.getElementById("zip").value
      const termsConsent = document.getElementById("terms-consent").checked

      if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zip || !termsConsent) {
        alert("Please fill in all required fields and accept the terms.")
        return
      }

      // Get the window details from the hidden field
      const windowDetails = windowDetailsInput.value
      const priceRange = estimatedPriceRangeInput.value

      // Store the thank you URL in localStorage to redirect after form submission
      const baseThankYouUrl = thankYouUrl.value.split("?")[0]
      const urlParams = new URLSearchParams(window.location.search)

      // Extract price information
      const redirectParams = new URLSearchParams()

      if (urlParams.has("lowerPrice") && urlParams.has("upperPrice")) {
        redirectParams.set("lowerPrice", urlParams.get("lowerPrice"))
        redirectParams.set("upperPrice", urlParams.get("upperPrice"))
      } else {
        // Use the calculated price range
        const priceRangeText = priceRange.replace(/[^\d-]/g, "").split("-")
        if (priceRangeText.length === 2) {
          redirectParams.set("lowerPrice", priceRangeText[0].trim())
          redirectParams.set("upperPrice", priceRangeText[1].trim())
        }
      }

      const redirectUrl = `${baseThankYouUrl}?${redirectParams.toString()}`
      localStorage.setItem("redirectUrl", redirectUrl)

      // Submit the form
      contactForm.submit()
    })
  }

  // Setup terms and privacy policy links to prevent form submission when clicked
  const termsLink = document.querySelector(".terms-link")
  const privacyLink = document.querySelector(".privacy-link")

  if (termsLink) {
    termsLink.addEventListener("click", (e) => {
      e.preventDefault()
      alert("Terms of Service would open in a new window. This is a placeholder.")
    })
  }

  if (privacyLink) {
    privacyLink.addEventListener("click", (e) => {
      e.preventDefault()
      alert("Privacy Policy would open in a new window. This is a placeholder.")
    })
  }

  function calculateDetailedPrice(count, type, material, size, screenType, hasGrids) {
    // Base price per window
    let baseWindowPrice = 799

    // Adjustments for window type
    switch (type) {
      case "double-hung":
        baseWindowPrice += 0
        break
      case "casement":
        baseWindowPrice += 44
        break
      case "2-lite-slider":
        baseWindowPrice += 23
        break
      case "3-lite-slider":
        baseWindowPrice += 785
        break
      case "picture":
        baseWindowPrice += 19
        break
      case "awning":
        baseWindowPrice += 32
        break
    }

    // Adjustments for frame material
    switch (material) {
      case "vinyl":
        baseWindowPrice += 0
        break
      case "composite":
        baseWindowPrice += 572
        break
    }

    // Adjustments for window size
    switch (size) {
      case "small":
        baseWindowPrice += 0
        break
      case "medium":
        baseWindowPrice += 136
        break
      case "large":
        baseWindowPrice += 289
        break
    }

    // Adjustments for screen type
    switch (screenType) {
      case "none":
        baseWindowPrice += 0
        break
      case "half":
        baseWindowPrice += 14
        break
      case "full":
        baseWindowPrice += 27
        break
    }

    // Adjustments for grids
    if (hasGrids) {
      baseWindowPrice += 89
    }

    // Calculate window cost
    const windowCost = baseWindowPrice * count

    // Calculate installation cost (varies by type, material, and size)
    let baseInstallCost = 0 // Base installation cost per window

    // Installation adjustments for window type
    switch (type) {
      case "double-hung":
        baseInstallCost += 0
        break
      case "casement":
        baseInstallCost += 0
        break
      case "2-lite-slider":
        baseInstallCost += 0
        break
      case "3-lite-slider":
        baseInstallCost += 0
        break
      case "picture":
        baseInstallCost += 0
      case "awning":
        baseInstallCost += 0
        break
    }

    // Installation adjustments for material (some materials are harder to install)
    switch (material) {
      case "vinyl":
        baseInstallCost += 0
        break
      case "composite":
        baseInstallCost += 0
        break
    }

    // Installation adjustments for size
    switch (size) {
      case "small":
        baseInstallCost += 0
        break
      case "medium":
        baseInstallCost += 0
        break
      case "large":
        baseInstallCost += 0
        break
    }

    // Installation adjustments for screens
    switch (screenType) {
      case "none":
        baseInstallCost += 0
        break
      case "half":
        baseInstallCost += 0
        break
      case "full":
        baseInstallCost += 0
        break
    }

    // Installation adjustments for grids
    if (hasGrids) {
      baseInstallCost += 0
    }

    // Calculate total installation cost
    const installationCost = baseInstallCost * count

    // Calculate subtotal before commission
    const subtotal = windowCost + installationCost

    // Add commission (typically 15-20% in home improvement)
    const commissionRate = 0.11 // 11%
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
