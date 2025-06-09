// NOTE: Replace [LPCLIENTID] with your actual LeadPerfection client ID before deploying
document.addEventListener("DOMContentLoaded", () => {
  const calculatorForm = document.getElementById("calculator-form")
  const calculatorResult = document.getElementById("calculator-result")
  const requestQuoteBtn = document.getElementById("request-quote-btn")
  const breakdownContainer = document.getElementById("price-breakdown")
  const windowCostElement = document.getElementById("window-cost")
  const installationCostElement = document.getElementById("installation-cost")
  const commissionElement = document.getElementById("commission")
  const totalCostElement = document.getElementById("total-cost")

  // Tab navigation elements
  const nextToColorsBtn = document.getElementById("next-to-colors-btn")
  const backToSpecsBtn = document.getElementById("back-to-specs-btn")
  const nextToContactBtn = document.getElementById("next-to-contact-btn")
  const backToColorsBtn = document.getElementById("back-to-colors-btn")

  const windowSpecsTab = document.querySelector('.form-tab[data-tab="window-specs"]')
  const colorHardwareTab = document.querySelector('.form-tab[data-tab="color-hardware"]')
  const contactInfoTab = document.querySelector('.form-tab[data-tab="contact-info"]')

  const windowSpecsContent = document.getElementById("window-specs-content")
  const colorHardwareContent = document.getElementById("color-hardware-content")
  const contactInfoContent = document.getElementById("contact-info-content")

  // Add tab navigation functionality
  if (nextToColorsBtn) {
    nextToColorsBtn.addEventListener("click", () => {
      // Validate window specs before proceeding
      const windowCount = document.getElementById("window-count").value
      const windowType = document.getElementById("window-type").value
      const frameMaterial = document.getElementById("frame-material").value
      const windowSize = document.getElementById("window-size").value
      const screenType = document.getElementById("screen-type").value

      if (!windowCount || !windowType || !frameMaterial || !windowSize || !screenType) {
        alert("Please fill in all window specification fields before proceeding.")
        return
      }

      // Switch to colors & hardware tab
      windowSpecsTab.classList.remove("active")
      colorHardwareTab.classList.add("active")
      windowSpecsContent.style.display = "none"
      colorHardwareContent.style.display = "block"
    })
  }

  if (backToSpecsBtn) {
    backToSpecsBtn.addEventListener("click", () => {
      // Switch back to window specs tab
      colorHardwareTab.classList.remove("active")
      windowSpecsTab.classList.add("active")
      colorHardwareContent.style.display = "none"
      windowSpecsContent.style.display = "block"
    })
  }

  if (nextToContactBtn) {
    nextToContactBtn.addEventListener("click", () => {
      // Switch to contact info tab
      colorHardwareTab.classList.remove("active")
      contactInfoTab.classList.add("active")
      colorHardwareContent.style.display = "none"
      contactInfoContent.style.display = "block"
    })
  }

  if (backToColorsBtn) {
    backToColorsBtn.addEventListener("click", () => {
      // Switch back to colors & hardware tab
      contactInfoTab.classList.remove("active")
      colorHardwareTab.classList.add("active")
      contactInfoContent.style.display = "none"
      colorHardwareContent.style.display = "block"
    })
  }

  // Tab click handlers
  if (windowSpecsTab) {
    windowSpecsTab.addEventListener("click", () => {
      colorHardwareTab.classList.remove("active")
      contactInfoTab.classList.remove("active")
      windowSpecsTab.classList.add("active")
      colorHardwareContent.style.display = "none"
      contactInfoContent.style.display = "none"
      windowSpecsContent.style.display = "block"
    })
  }

  if (colorHardwareTab) {
    colorHardwareTab.addEventListener("click", () => {
      // Validate window specs before allowing tab switch
      const windowCount = document.getElementById("window-count").value
      const windowType = document.getElementById("window-type").value
      const frameMaterial = document.getElementById("frame-material").value
      const windowSize = document.getElementById("window-size").value
      const screenType = document.getElementById("screen-type").value

      if (!windowCount || !windowType || !frameMaterial || !windowSize || !screenType) {
        alert("Please fill in all window specification fields before proceeding.")
        return
      }

      windowSpecsTab.classList.remove("active")
      contactInfoTab.classList.remove("active")
      colorHardwareTab.classList.add("active")
      windowSpecsContent.style.display = "none"
      contactInfoContent.style.display = "none"
      colorHardwareContent.style.display = "block"
    })
  }

  if (contactInfoTab) {
    contactInfoTab.addEventListener("click", () => {
      // Validate window specs before allowing tab switch
      const windowCount = document.getElementById("window-count").value
      const windowType = document.getElementById("window-type").value
      const frameMaterial = document.getElementById("frame-material").value
      const windowSize = document.getElementById("window-size").value
      const screenType = document.getElementById("screen-type").value

      if (!windowCount || !windowType || !frameMaterial || !windowSize || !screenType) {
        alert("Please fill in all window specification fields before proceeding.")
        return
      }

      windowSpecsTab.classList.remove("active")
      colorHardwareTab.classList.remove("active")
      contactInfoTab.classList.add("active")
      windowSpecsContent.style.display = "none"
      colorHardwareContent.style.display = "none"
      contactInfoContent.style.display = "block"
    })
  }

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

    // Validate all required fields
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

    // Get form values for window specifications
    const windowCount = Number.parseInt(document.getElementById("window-count").value)
    const windowType = document.getElementById("window-type").value
    const frameMaterial = document.getElementById("frame-material").value
    const windowSize = document.getElementById("window-size").value
    const screenType = document.getElementById("screen-type").value
    const hasGrids = document.querySelector('input[name="grids"]:checked').value === "yes"

    // Get color and hardware selections
    const exteriorColor = document.querySelector('input[name="exterior-color"]:checked').value
    const interiorColor = document.querySelector('input[name="interior-color"]:checked').value
    const hardware = document.querySelector('input[name="hardware"]:checked').value

    // Calculate prices
    const { totalPrice } = calculateDetailedPrice(
      windowCount,
      windowType,
      frameMaterial,
      windowSize,
      screenType,
      hasGrids,
      exteriorColor,
      interiorColor,
      hardware,
    )

    // Calculate price range (20% below and above)
    const lowerPrice = Math.round(totalPrice * 0.8)
    const upperPrice = Math.round(totalPrice * 1.2)

    // Display result with animation
    const priceRangeElement = document.getElementById("price-range")
    priceRangeElement.textContent = `$${lowerPrice.toLocaleString()} - $${upperPrice.toLocaleString()}`

    // Hide breakdown container
    breakdownContainer.style.display = "none"

    // Update selected options display
    document.getElementById("result-window-type").textContent = formatOptionName(windowType)
    document.getElementById("result-frame-material").textContent = formatOptionName(frameMaterial)
    document.getElementById("result-window-size").textContent = windowSize
    document.getElementById("result-window-count").textContent = windowCount
    document.getElementById("result-exterior-color").textContent = formatOptionName(exteriorColor)
    document.getElementById("result-interior-color").textContent = formatOptionName(interiorColor)
    document.getElementById("result-hardware").textContent = formatOptionName(hardware)
    document.getElementById("result-screen-type").textContent = formatOptionName(screenType)
    document.getElementById("result-grids").textContent = hasGrids ? "Yes" : "No"

    // Prepare notes with all form data
    let notesContent = "Window Replacement Calculator Quote:\n\n"

    // Add window specifications
    notesContent += `Window Count: ${windowCount}\n`
    notesContent += `Window Type: ${windowType}\n`
    notesContent += `Frame Material: ${frameMaterial}\n`
    notesContent += `Window Size: ${windowSize}\n`
    notesContent += `Screen Type: ${screenType}\n`
    notesContent += `Grids: ${hasGrids ? "Yes" : "No"}\n`
    notesContent += `Exterior Color: ${exteriorColor}\n`
    notesContent += `Interior Color: ${interiorColor}\n`
    notesContent += `Hardware: ${hardware}\n\n`
    notesContent += `Estimated Price Range: $${lowerPrice.toLocaleString()} - $${upperPrice.toLocaleString()}\n`

    // Add comments if available
    const comments = document.getElementById("comments").value
    if (comments) {
      notesContent += `\nAdditional Comments: ${comments}\n`
    }

    // Create form data for LeadConduit
    const leadConduitData = new URLSearchParams()

    // Required fields with LeadConduit field names
    leadConduitData.append("first_name", firstName)
    leadConduitData.append("last_name", lastName)
    leadConduitData.append("address_1", address)
    leadConduitData.append("city", city)
    leadConduitData.append("state", state)
    leadConduitData.append("postal_code", zip) // Changed from zip to postal_code
    leadConduitData.append("phone_1", phone) // Changed from phone1 to phone_1
    leadConduitData.append("email", email)
    leadConduitData.append("comments", notesContent) // Changed from notes to comments
    leadConduitData.append("product", "Window Replacement") // Changed from productid/proddescr to product

    // Additional fields
    leadConduitData.append("original_source", "replacementwindowcosts.com")

    try {
      // First, show the result immediately to improve user experience
      calculatorForm.style.display = "none"
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
        exteriorColor: exteriorColor,
        interiorColor: interiorColor,
        hardware: hardware,
        price: totalPrice,
        lowerPrice: lowerPrice,
        upperPrice: upperPrice,
        name: `${firstName} ${lastName}`,
        email: email,
        phone: phone,
        address: `${address}, ${city}, ${state} ${zip}`,
      })

      requestQuoteBtn.setAttribute("href", `${baseUrl}?${queryParams.toString()}`)

      // Store lead information in localStorage
      const leadInfo = {
        windowCount,
        windowType,
        frameMaterial,
        windowSize,
        screenType,
        hasGrids,
        exteriorColor,
        interiorColor,
        hardware,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zip,
        comments: document.getElementById("comments").value,
        priceRange: `$${lowerPrice.toLocaleString()} - $${upperPrice.toLocaleString()}`,
        timestamp: new Date().toISOString(),
      }

      localStorage.setItem("recentLead", JSON.stringify(leadInfo))

      // Scroll to result
      calculatorResult.scrollIntoView({ behavior: "smooth" })

      // Then, send data to LeadConduit in the background
      fetch("https://app.leadconduit.com/flows/67f7c604f84b9544eca41ff7/sources/680b67e1735fe6f491a213ac/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: leadConduitData,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("LeadConduit response:", data)
        })
        .catch((error) => {
          console.error("Error:", error)
          // Don't alert the user since we've already shown the result
        })
    } catch (error) {
      console.error("Error in form submission:", error)

      // Still show the result even if there's an error with the API
      calculatorForm.style.display = "none"
      calculatorResult.style.display = "block"
      calculatorResult.classList.add("fadeIn")
      calculatorResult.scrollIntoView({ behavior: "smooth" })
    }
  })

  // Helper function to format option names for display
  function formatOptionName(option) {
    if (!option) return ""

    // Replace hyphens with spaces and capitalize each word
    return option
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
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

  function calculateDetailedPrice(
    count,
    type,
    material,
    size,
    screenType,
    hasGrids,
    exteriorColor,
    interiorColor,
    hardware,
  ) {
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

    // Adjustments for exterior color
    if (exteriorColor && exteriorColor !== "white") {
      baseWindowPrice += 99
    }

    // Adjustments for interior color
    if (interiorColor && interiorColor !== "white") {
      baseWindowPrice += 99
    }

    // Adjustments for hardware
    if (hardware && hardware !== "white") {
      baseWindowPrice += 52
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

  // Improve mobile experience for tab navigation
  const formTabs = document.querySelector(".form-tabs")
  if (formTabs) {
    // Add horizontal scroll with touch
    formTabs.addEventListener(
      "touchstart",
      function (e) {
        this.startX = e.touches[0].clientX
        this.scrollLeft = this.scrollLeft
      },
      { passive: true },
    )

    formTabs.addEventListener(
      "touchmove",
      function (e) {
        if (!this.startX) return

        const x = e.touches[0].clientX
        const walk = x - this.startX
        this.scrollLeft = this.scrollLeft - walk
      },
      { passive: true },
    )

    formTabs.addEventListener(
      "touchend",
      function () {
        this.startX = null
      },
      { passive: true },
    )
  }

  // Ensure proper display on mobile orientation change
  window.addEventListener("orientationchange", () => {
    // Small delay to allow the browser to complete the orientation change
    setTimeout(() => {
      // Adjust any elements that might need fixing after orientation change
      const activeTab = document.querySelector(".form-tab.active")
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
      }

      // Force redraw of color and hardware options
      const colorOptions = document.querySelector(".color-options")
      const hardwareOptions = document.querySelector(".hardware-options")

      if (colorOptions) colorOptions.style.display = "none"
      if (hardwareOptions) hardwareOptions.style.display = "none"

      setTimeout(() => {
        if (colorOptions) colorOptions.style.display = ""
        if (hardwareOptions) hardwareOptions.style.display = ""
      }, 50)
    }, 300)
  })
})
