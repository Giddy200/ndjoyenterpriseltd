(() => {
  const scriptUrl = document.currentScript && document.currentScript.src;
  if (scriptUrl && document.head) {
    const assetUrl = new URL('.', scriptUrl);
    const iconLinks = [
      { rel: 'icon', href: 'ndjoy-mark.png', type: 'image/png', sizes: '512x512' },
      { rel: 'apple-touch-icon', href: 'ndjoy-mark.png', sizes: '512x512' }
    ];
    iconLinks.forEach(({ rel, href, type, sizes }) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = new URL(href, assetUrl).href;
      if (type) link.type = type;
      if (sizes) link.sizes = sizes;
      document.head.append(link);
    });
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const serviceNav = document.querySelector('.nav-service');
  const serviceToggle = document.querySelector('.nav-service-toggle');
  const menuIcon = toggle ? toggle.innerHTML : '';
  const closeMenu = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('mobile-open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.innerHTML = menuIcon;
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('mobile-open');
      document.body.classList.toggle('menu-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      toggle.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>'
        : menuIcon;
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  if (serviceToggle && serviceNav) {
    serviceToggle.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpen = serviceNav.classList.toggle('open');
      serviceToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (event) => {
      if (!serviceNav.contains(event.target)) {
        serviceNav.classList.remove('open');
        serviceToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        serviceNav.classList.remove('open');
        serviceToggle.setAttribute('aria-expanded', 'false');
        closeMenu();
      }
    });
  }

  // Reveal motion respects the visitor's reduced-motion setting.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const heroImageSets = {
    home: [
      'photo-1504307651254-35680f356dfd',
      'photo-1521737711867-e3b97375f902',
      'photo-1581578731548-c64695cc6952'
    ],
    'about.html': [
      'photo-1521737711867-e3b97375f902',
      'photo-1503387762-592deb58ef4e',
      'photo-1522071820081-009f0129c71c'
    ],
    'contact.html': [
      'photo-1521737711867-e3b97375f902',
      'photo-1527515637462-cff94eecc1ac',
      'photo-1504148455328-c376907d081c'
    ],
    'quote.html': [
      'photo-1504307651254-35680f356dfd',
      'photo-1530124566582-a618bc2615dc',
      'photo-1522071820081-009f0129c71c'
    ],
    'construction-materials.html': [
      'photo-1504307651254-35680f356dfd',
      'photo-1503387762-592deb58ef4e',
      'photo-1508450859948-4e04fabaa4ea'
    ],
    'hardware-retail.html': [
      'photo-1530124566582-a618bc2615dc',
      'photo-1504148455328-c376907d081c',
      'photo-1586864387967-d02ef85d93e8'
    ],
    'staffing.html': [
      'photo-1521737711867-e3b97375f902',
      'photo-1522071820081-009f0129c71c',
      'photo-1551836022-d5d88e9218df'
    ],
    'cleaning.html': [
      'photo-1581578731548-c64695cc6952',
      'photo-1527515637462-cff94eecc1ac',
      'photo-1528740561666-dc2479dc08ab'
    ]
  };
  const pageName = window.location.pathname.split('/').pop();
  const hero = document.querySelector('.page-hero, .hero');
  const imageIds = heroImageSets[pageName] || (hero && hero.classList.contains('hero') ? heroImageSets.home : null);
  if (hero && imageIds) {
    const slideshow = document.createElement('div');
    slideshow.className = `${hero.classList.contains('page-hero') ? 'page-' : ''}hero-slideshow`;
    slideshow.setAttribute('aria-hidden', 'true');
    const slides = imageIds.map((id, index) => {
      const image = document.createElement('img');
      image.src = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`;
      image.alt = '';
      image.decoding = 'async';
      if (index === 0) image.classList.add('is-active');
      slideshow.append(image);
      return image;
    });
    hero.prepend(slideshow);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let activeIndex = 0;
      window.setInterval(() => {
        slides[activeIndex].classList.remove('is-active');
        activeIndex = (activeIndex + 1) % slides.length;
        slides[activeIndex].classList.add('is-active');
      }, 7000);
    }
  }

  const siteRoot = scriptUrl ? new URL('../', new URL('.', scriptUrl)) : new URL('.', window.location.href);
  const quoteUrl = new URL('quote.html', siteRoot).href;
  const contactUrl = new URL('contact.html', siteRoot).href;
  const chat = document.createElement('div');
  chat.className = 'customer-chat';
  chat.innerHTML = `
    <button class="chat-launcher" type="button" aria-expanded="false" aria-haspopup="dialog" aria-controls="customer-chat-panel">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/></svg>
      <span>Chat with us</span>
    </button>
    <section class="chat-panel" id="customer-chat-panel" role="dialog" aria-labelledby="customer-chat-title" aria-modal="false" hidden>
      <header class="chat-header">
        <div><strong id="customer-chat-title">NDJOY customer care</strong><span>Website assistant · Instant help</span></div>
        <button class="chat-close" type="button" aria-label="Close chat">&times;</button>
      </header>
      <div class="chat-messages" role="log" aria-live="polite" aria-relevant="additions"></div>
      <div class="chat-actions" aria-label="Suggested questions"></div>
      <form class="chat-form">
        <input type="text" name="message" maxlength="1000" placeholder="Type your question…" autocomplete="off" aria-label="Type your message" required>
        <button type="submit" aria-label="Send message">↑</button>
      </form>
      <p class="chat-disclaimer">Automated assistant; not monitored live. Enquiry details are held briefly in this browser to fill the quote form. The form prepares an email for you to send; chat does not submit anything to NDJOY.</p>
    </section>
  `;
  document.body.append(chat);

  const chatLauncher = chat.querySelector('.chat-launcher');
  const chatPanel = chat.querySelector('.chat-panel');
  const chatClose = chat.querySelector('.chat-close');
  const chatMessages = chat.querySelector('.chat-messages');
  const chatActions = chat.querySelector('.chat-actions');
  const chatForm = chat.querySelector('.chat-form');
  const chatInput = chatForm.elements.message;
  const serviceOptions = [
    { label: 'Construction materials', value: 'Wholesale wood, construction materials and sanitary equipment' },
    { label: 'Hardware, paints & glass', value: 'Hardware, paints and glass' },
    { label: 'Temporary staffing', value: 'Temporary employment / staffing' },
    { label: 'Building cleaning', value: 'General building cleaning' },
    { label: 'Not sure', value: 'Other / not sure' }
  ];
  let enquiryStage = '';
  let enquiryDraft = {};

  const addChatMessage = (text, sender = 'assistant') => {
    const message = document.createElement('div');
    message.className = `chat-message${sender === 'user' ? ' user' : ''}`;
    message.textContent = text;
    chatMessages.append(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const setChatActions = (actions = []) => {
    chatActions.replaceChildren();
    actions.forEach(({ label, onSelect }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', onSelect);
      chatActions.append(button);
    });
  };

  const openChat = () => {
    chatPanel.hidden = false;
    chatLauncher.setAttribute('aria-expanded', 'true');
    chatInput.focus();
  };
  const closeChat = () => {
    chatPanel.hidden = true;
    chatLauncher.setAttribute('aria-expanded', 'false');
    chatLauncher.focus();
  };

  const startEnquiry = (serviceValue = '') => {
    enquiryDraft = {};
    if (serviceValue) {
      enquiryDraft.service = serviceValue;
      enquiryStage = 'location';
      addChatMessage(`I can help prepare an enquiry about ${serviceValue}. What postcode or project location should the team consider?`);
      setChatActions([]);
    } else {
      enquiryStage = 'service';
      addChatMessage('I can help prepare an enquiry. Which service is it about?');
      setChatActions(serviceOptions.map((option) => ({
        label: option.label,
        onSelect: () => handleChatInput(option.label)
      })));
    }
  };

  const continueToQuote = () => {
    try {
      window.sessionStorage.setItem('ndjoyEnquiryDraft', JSON.stringify(enquiryDraft));
      window.location.href = quoteUrl;
    } catch (error) {
      addChatMessage('I couldn’t transfer the details to the quote form in this browser. The form will open blank; please copy the enquiry summary above into it.');
      setChatActions([{ label: 'Open blank quote form', onSelect: () => { window.location.href = quoteUrl; } }]);
    }
  };

  const handleEnquiryAnswer = (text) => {
    if (enquiryStage === 'service') {
      const normalized = text.toLowerCase();
      const selected = serviceOptions.find((option) => option.label.toLowerCase() === normalized)
        || serviceOptions.find((option) => option.value.toLowerCase() === normalized)
        || (/(material|timber|wood|construction|sanitary)/.test(normalized) ? serviceOptions[0] : null)
        || (/(hardware|paint|glass)/.test(normalized) ? serviceOptions[1] : null)
        || (/(staff|workforce|recruit|worker|employment)/.test(normalized) ? serviceOptions[2] : null)
        || (/(cleaning|cleaner|premises)/.test(normalized) ? serviceOptions[3] : null);
      if (!selected) {
        addChatMessage('I didn’t catch which service you need. Please choose an option below, or select “Not sure”.');
        setChatActions(serviceOptions.map((option) => ({
          label: option.label,
          onSelect: () => handleChatInput(option.label)
        })));
        return;
      }
      enquiryDraft.service = selected.value;
      enquiryStage = 'location';
      addChatMessage('Thanks. What postcode or project location should the team consider?');
      setChatActions([]);
      return;
    }
    if (enquiryStage === 'location') {
      enquiryDraft.postcode = text;
      enquiryStage = 'details';
      addChatMessage('What would you like help with? Add any useful quantities, specifications, timing or frequency.');
      return;
    }
    enquiryDraft.message = text;
    enquiryStage = '';
    addChatMessage(`Here’s the enquiry summary to review:\nService: ${enquiryDraft.service}\nLocation: ${enquiryDraft.postcode}\nDetails: ${enquiryDraft.message}\n\nContinue to the quote form to add your name and email. Nothing has been sent.`);
    setChatActions([
      { label: 'Continue to quote form', onSelect: continueToQuote },
      { label: 'Start again', onSelect: startEnquiry },
      { label: 'Ask another question', onSelect: () => addChatMessage('You can ask about services, quotes, delivery or contact options.') }
    ]);
  };

  const handleChatInput = (text) => {
    const message = text.trim();
    if (!message) return;
    addChatMessage(message, 'user');
    setChatActions([]);
    if (enquiryStage) {
      handleEnquiryAnswer(message);
      return;
    }

    const query = message.toLowerCase();
    if (/^(hi|hello|hey|good morning|good afternoon)\b/.test(query)) {
      addChatMessage('Hello! I can help with NDJOY’s services, quote enquiries and the next steps.');
      setChatActions([
        { label: 'Explore services', onSelect: () => handleChatInput('What services do you offer?') },
        { label: 'Start an enquiry', onSelect: startEnquiry },
        { label: 'Contact options', onSelect: () => handleChatInput('How can I contact someone?') }
      ]);
    } else if (/(price|pricing|cost|quote|estimate)/.test(query)) {
      addChatMessage('Prices and availability depend on the specific requirements, quantities and location, so I can’t give a reliable price here. I can help you prepare the details for a quote.');
      setChatActions([
        { label: 'Prepare an enquiry', onSelect: startEnquiry },
        { label: 'Open quote form', onSelect: () => { window.location.href = quoteUrl; } }
      ]);
    } else if (/(opening hours|business hours|when are you open|working hours)/.test(query)) {
      addChatMessage('Opening hours have not been published on this website, so I can’t confirm them. You can leave an enquiry in the contact or quote form.');
      setChatActions([{ label: 'Open contact form', onSelect: () => { window.location.href = contactUrl; } }]);
    } else if (/(delivery|deliver|coverage|service area|where do you|location|postcode)/.test(query)) {
      addChatMessage('The website doesn’t specify a confirmed service or delivery area. Please share the project postcode in an enquiry so the team can confirm availability.');
      setChatActions([{ label: 'Share project details', onSelect: startEnquiry }]);
    } else if (/(human|person|someone|speak|call|phone|email|contact)/.test(query)) {
      addChatMessage('There is no public customer phone number or email address listed on this website. The contact form can prepare an email in your own email app; it does not send anything to a server.');
      setChatActions([{ label: 'Open contact form', onSelect: () => { window.location.href = contactUrl; } }]);
    } else if (/(cleaning|cleaner|premises)/.test(query)) {
      addChatMessage('NDJOY lists general building cleaning. For an enquiry, include the building type and size, desired frequency, location and any specialist requirements. Availability and scope need to be confirmed.');
      setChatActions([
        { label: 'View cleaning information', onSelect: () => { window.location.href = new URL('services/cleaning.html', siteRoot).href; } },
        { label: 'Enquire about cleaning', onSelect: () => startEnquiry('General building cleaning') }
      ]);
    } else if (/(job applicant|looking for work|apply for a job|job vacancy|vacancies|careers)/.test(query)) {
      addChatMessage('This website describes temporary staffing services for businesses but does not publish vacancies or candidate application details. You can use the contact form to ask whether there are current opportunities.');
      setChatActions([{ label: 'Open contact form', onSelect: () => { window.location.href = contactUrl; } }]);
    } else if (/(complaint|problem|issue|damaged|wrong order|something went wrong)/.test(query)) {
      addChatMessage('I’m sorry there’s a problem. I can’t access orders or pass messages to a live team. Please use the contact form and include the service, date, location and what happened. Don’t include payment details or passwords.');
      setChatActions([{ label: 'Open contact form', onSelect: () => { window.location.href = contactUrl; } }]);
    } else if (/(staff|workforce|recruit|worker|employment|job)/.test(query)) {
      addChatMessage('NDJOY lists temporary employment agency activities. For a useful enquiry, include the roles, headcount, location, shifts, start date and expected duration. Availability and terms need to be confirmed.');
      setChatActions([
        { label: 'View staffing information', onSelect: () => { window.location.href = new URL('services/staffing.html', siteRoot).href; } },
        { label: 'Enquire about staffing', onSelect: () => startEnquiry('Temporary employment / staffing') }
      ]);
    } else if (/(hardware|paint|glass|fitting|tools)/.test(query)) {
      addChatMessage('NDJOY lists retail enquiries for hardware, paints and glass. Include product specifications, sizes, finishes and quantities; stock and suitability need to be confirmed.');
      setChatActions([
        { label: 'View retail supplies information', onSelect: () => { window.location.href = new URL('services/hardware-retail.html', siteRoot).href; } },
        { label: 'Enquire about retail supplies', onSelect: () => startEnquiry('Hardware, paints and glass') }
      ]);
    } else if (/(material|timber|wood|construction|sanitary|building supplies)/.test(query)) {
      addChatMessage('NDJOY lists wholesale wood, construction materials and sanitary equipment. Include product specifications, quantities, delivery postcode and preferred timing; availability and delivery options need to be confirmed.');
      setChatActions([
        { label: 'View materials information', onSelect: () => { window.location.href = new URL('services/construction-materials.html', siteRoot).href; } },
        { label: 'Enquire about materials', onSelect: () => startEnquiry('Wholesale wood, construction materials and sanitary equipment') }
      ]);
    } else if (/(service|help|offer|what can you do)/.test(query)) {
      addChatMessage('The website lists four service areas: construction materials and sanitary equipment; hardware, paints and glass; temporary staffing; and general building cleaning. Select one to learn more or prepare an enquiry.');
      setChatActions([
        { label: 'Construction materials', onSelect: () => handleChatInput('Tell me about construction materials') },
        { label: 'Hardware, paints & glass', onSelect: () => handleChatInput('Tell me about hardware and paint') },
        { label: 'Temporary staffing', onSelect: () => handleChatInput('Tell me about staffing') },
        { label: 'Building cleaning', onSelect: () => handleChatInput('Tell me about cleaning') },
        { label: 'Start an enquiry', onSelect: startEnquiry }
      ]);
    } else {
      addChatMessage('I can help with service information, quote enquiries, delivery-area questions and contact options. What would you like to know?');
      setChatActions([
        { label: 'Explore services', onSelect: () => handleChatInput('What services do you offer?') },
        { label: 'Prepare an enquiry', onSelect: startEnquiry },
        { label: 'Contact options', onSelect: () => handleChatInput('How can I contact someone?') }
      ]);
    }
  };

  chatLauncher.addEventListener('click', () => {
    if (chatPanel.hidden) openChat();
    else closeChat();
  });
  chatClose.addEventListener('click', closeChat);
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleChatInput(chatInput.value);
    chatForm.reset();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !chatPanel.hidden) closeChat();
  });
  addChatMessage('Welcome to NDJOY Enterprise. I’m the website assistant. Ask about our services or choose an option to get started.');
  setChatActions([
    { label: 'Explore services', onSelect: () => handleChatInput('What services do you offer?') },
    { label: 'Prepare an enquiry', onSelect: startEnquiry },
    { label: 'Contact options', onSelect: () => handleChatInput('How can I contact someone?') }
  ]);

  if (pageName === 'quote.html') {
    try {
      const savedDraft = window.sessionStorage.getItem('ndjoyEnquiryDraft');
      if (savedDraft) {
        window.sessionStorage.removeItem('ndjoyEnquiryDraft');
        const draft = JSON.parse(savedDraft);
        const form = document.querySelector('[data-enquiry-form="quote"]');
        if (form && draft && typeof draft === 'object') {
          ['service', 'postcode', 'message'].forEach((fieldName) => {
            const field = form.elements.namedItem(fieldName);
            const value = draft[fieldName];
            if (field && typeof value === 'string') field.value = value;
          });
        }
      }
    } catch (error) {
      addChatMessage('I couldn’t restore the enquiry details from this browser. Please check the quote form before continuing.');
      const status = document.querySelector('[data-enquiry-form="quote"] .form-status');
      if (status) {
        status.textContent = 'The enquiry details from chat could not be restored. Please check and complete the form before continuing.';
        status.classList.add('show');
      }
    }
  }

  // Front-end quote/contact form. Uses the visitor's email app as a no-backend fallback.
  document.querySelectorAll('[data-enquiry-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const pageKind = form.dataset.enquiryForm === 'quote' ? 'Quote / service request' : 'Website enquiry';
      const subject = `${pageKind} — ${data.get('service') || 'General enquiry'}`;
      const lines = [
        `Type: ${pageKind}`,
        `Name: ${data.get('name') || ''}`,
        `Email: ${data.get('email') || ''}`,
        `Phone: ${data.get('phone') || 'Not provided'}`,
        `Service: ${data.get('service') || 'Not specified'}`,
        `Company / organisation: ${data.get('company') || 'Not provided'}`,
        `Postcode / location: ${data.get('postcode') || 'Not provided'}`,
        `Preferred date: ${data.get('date') || 'Flexible / not specified'}`,
        `Budget: ${data.get('budget') || 'Not specified'}`,
        '',
        'Project details:',
        data.get('message') || 'No additional details provided.',
        '',
        'Sent from the NDJOY Enterprise Limited website.'
      ];
      const status = form.querySelector('.form-status');
      if (status) {
        status.textContent = 'Your email app should open with the request prepared. Please send the email to submit it. This website has not sent or stored your information.';
        status.classList.add('show');
      }
      const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      window.location.href = mailto;
    });
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
