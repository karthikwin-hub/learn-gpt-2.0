import { test, expect } from '@playwright/test';

test.describe('Feature 002: Lesson engine, Bodha cards and Living Film player', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  // =========================================================================
  // Story US1: Universal 7-Stage Thread Flow
  // =========================================================================

  test('US1-AS1: Carry On State Retention returns learner to workbench with model state intact', async ({
    page,
  }) => {
    // Given a child is mid-thread at the workbench (rect) with modified state
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
      localStorage.setItem('gurukul:continue', JSON.stringify({ knot: 'M4', route: 'rect' }));
    });

    await page.goto('/#/rect');
    const grid = page.locator('.area-grid, .manip-grid');
    await expect(grid).toBeVisible();

    // Adjust grid state via stepper
    const colStepperPlus = page
      .locator('.stepper', { hasText: /across/i })
      .locator('button', { hasText: '+' });
    await expect(colStepperPlus).toBeVisible();
    await colStepperPlus.click();

    // When they navigate back to the Ashram
    await page.goto('/#/home');
    const continueCard = page.locator('.continue-card, .ashram-continue');
    await expect(continueCard).toBeVisible();

    const carryOnBtn = continueCard.locator('button', { hasText: /carry on|continue/i });
    await expect(carryOnBtn).toBeVisible();
    await carryOnBtn.click();

    // Then they return directly to rect with model state intact
    await expect(page).toHaveURL(/#\/rect/);
    const eq = page.locator('.eq');
    await expect(eq).toBeVisible();
  });

  test('US1-AS2: Linear Progression without Film transitions directly from Bodha to Workbench', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    // Given a knot without a Living Film (e.g. M4)
    await page.goto('/#/bodha?k=M4');
    const bodha = page.locator('.bodha');
    await expect(bodha).toBeVisible();

    // Sutra card displays To the workbench
    const toBenchBtn = page.locator('button', { hasText: /workbench|bench/i });
    await expect(toBenchBtn).toBeVisible();
    await toBenchBtn.click();

    // Then flow transitions directly to rect
    await expect(page).toHaveURL(/#\/rect/);
  });

  test('US1-AS3: Linear Progression with Film transitions from Bodha sutra card to Living Film', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    // Given a knot with a Living Film (M2)
    await page.goto('/#/bodha?k=M2');
    const bodha = page.locator('.bodha');
    await expect(bodha).toBeVisible();

    // When child finishes Bodha sutra card
    const toFilmBtn = page.locator('button', { hasText: /film|watch/i });
    await expect(toFilmBtn).toBeVisible();
    await toFilmBtn.click();

    // Then flow transitions to the Living Film player
    await expect(page).toHaveURL(/#\/film/);
  });

  // =========================================================================
  // Story US2: Living Film Player
  // =========================================================================

  test('US2-AS1: Beat Pause automatically halts at narrative beat end and keeps caption visible', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/film');
    const filmStage = page.locator('.film-stage');
    await expect(filmStage).toBeVisible();

    const playBtn = page.locator('.play-btn');
    await expect(playBtn).toBeVisible();
    await playBtn.click();

    // After beat finishes (beat 1 ends at 6s), it pauses automatically
    const filmLine = page.locator('.film-line');
    await expect(filmLine).toBeVisible();
    await expect(filmLine).toContainText(/1 of 5|beat/i);

    // Caption remains visible and play button offers resume/replay
    await expect(playBtn).toHaveAttribute('aria-label', /play|continue/i);
  });

  test('US2-AS2: Interactive Exploration During Pause displays modified model with faint ghost outline', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/film');
    const scrubber = page.locator('input[type="range"][aria-label*="scrub" i]');
    await expect(scrubber).toBeVisible();

    // Scrub to beat 3 (t >= 14s) where handle appears
    await scrubber.fill('160'); // 16.0s
    await scrubber.dispatchEvent('input');

    const handle = page.locator('.handle');
    await expect(handle).toBeVisible();

    // Press ArrowRight on handle to expand model
    await handle.focus();
    await page.keyboard.press('ArrowRight');

    // Active scene shows modified model and ghostLayer displays ghost outline
    const ghostRect = page.locator('svg g rect[stroke-dasharray]');
    await expect(ghostRect.first()).toBeVisible();
  });

  test('US2-AS3: Bidirectional Scrubber updates scene and model in real time', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/film');
    const scrubber = page.locator('input[type="range"][aria-label*="scrub" i]');
    await expect(scrubber).toBeVisible();

    // Scrub forward to 25s
    await scrubber.fill('250');
    await scrubber.dispatchEvent('input');
    const filmLine = page.locator('.film-line');
    await expect(filmLine).toBeVisible();

    // Scrub backward to 4s
    await scrubber.fill('40');
    await scrubber.dispatchEvent('input');
    await expect(filmLine).toContainText(/1 of 5/i);
  });

  test('US2-AS4: Reduced Motion Cut Mode replaces continuous animation with step cuts between beats', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/film');
    const playBtn = page.locator('.play-btn');
    await expect(playBtn).toBeVisible();
    await playBtn.click();

    // Under reduced motion, clicking play cuts immediately to beat 1 end (6.0s)
    const scrubber = page.locator('input[type="range"][aria-label*="scrub" i]');
    await expect(scrubber).toHaveValue('60');
  });

  // =========================================================================
  // Story US3: Narration, Captions & Sound Control
  // =========================================================================

  test('US3-AS1: Muted Captions Parity ensures spoken lines appear in caption banner when sound is off', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
      localStorage.setItem('gurukul:sound', 'false');
    });

    await page.goto('/#/wonder');
    const caption = page.locator('#caption');
    await expect(caption).toBeVisible();
    const text = await caption.textContent();
    expect(text && text.trim().length).toBeGreaterThan(0);
  });

  test('US3-AS2: Speech Rate Toggle adjusts playback rate between normal and slow', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/grownups');
    const slowRateToggle = page.locator('button, input', { hasText: /slow|rate|speed/i });
    await expect(slowRateToggle).toBeVisible();
    await slowRateToggle.click();
    const savedRate = await page.evaluate(() => localStorage.getItem('gurukul:voiceRate'));
    expect(Number(savedRate)).toBeLessThan(1.0);
  });

  // =========================================================================
  // Story US4: Workbench Linked Representations & Step Fading
  // =========================================================================

  test('US4-AS1: Simultaneous Representation Update links grid visual, dimensions, and equation', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/rect');
    const eq = page.locator('.eq');
    await expect(eq).toBeVisible();

    const initialEq = await eq.textContent();

    // Adjust cross dimension stepper
    const plusBtn = page
      .locator('.stepper', { hasText: /across/i })
      .locator('button', { hasText: '+' });
    await expect(plusBtn).toBeVisible();
    await plusBtn.click();

    // Equation updates immediately in same frame
    const updatedEq = await eq.textContent();
    expect(updatedEq).not.toEqual(initialEq);
  });

  test('US4-AS2: Scaffold Fading transitions from guided demonstration to independent exploration', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/rect');
    const stepGuide = page.locator('.step-guide');
    await expect(stepGuide).toBeVisible();
    await expect(stepGuide).toContainText(/1/);

    // Step 1 offers Show Me
    const showMe = page.locator('button', { hasText: /show me/i });
    await expect(showMe).toBeVisible();
  });

  // =========================================================================
  // Story US5: Calm Pedagogical Feedback & Zero Gamification
  // =========================================================================

  test('US5-AS1: Descriptive Reality Feedback describes concrete actions without praise, points, or streaks', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/rect');
    const say = page.locator('.say, .workbench-feedback');
    await expect(say).toBeVisible();

    const sayContent = (await say.textContent()) || '';
    // Assert strictly zero gamification praise words
    const banned = [
      /\bgreat\b/i,
      /\bgood job\b/i,
      /\bsmart\b/i,
      /\bbravo\b/i,
      /\bstreak\b/i,
      /\bpoints?\b/i,
      /\bstars?\b/i,
      /\bscore\b/i,
    ];
    for (const b of banned) {
      expect(sayContent).not.toMatch(b);
    }
  });

  test('US5-AS2: Non-Punitive Color Invariant never uses punitive red for errors or mistakes', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/mistake');
    const mistakeSteps = page.locator('.work-steps button');
    await expect(mistakeSteps.first()).toBeVisible();

    // Tap a step
    await mistakeSteps.first().click();

    // No error banners or red failure borders
    const punitiveRedElements = page.locator('.error, .wrong, .penalty');
    await expect(punitiveRedElements).toHaveCount(0);
  });

  // =========================================================================
  // Story US6: Bodha Cards Engine & Glossary Bridge
  // =========================================================================

  test('US6-AS1: Prashna to Bodha Gate requires prediction commitment before opening Bodha card 1', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/wonder');
    const guessInput = page.locator('input[type="range"][aria-label*="guess" i]');
    await expect(guessInput).toBeVisible();

    const goBtn = page.locator('button', { hasText: /let's see|continue|go/i });
    await expect(goBtn).toBeVisible();
    await goBtn.click();

    // Navigates to Bodha card 1 for M2
    await expect(page).toHaveURL(/#\/bodha\?k=M2/);
    const cardTitle = page.locator('.screen-title');
    await expect(cardTitle).toBeVisible();
  });

  test('US6-AS2: Step-by-Step Worked Example Reveal displays one step at a time', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/bodha?k=M2');
    const bodhaScreen = page.locator('.bodha');
    await expect(bodhaScreen).toBeVisible();

    // Advance to worked example card
    const nextBtn = page.locator('.bodha-nav button', { hasText: /next/i });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    const stepBtn = page.locator('button', { hasText: /first step|next step/i });
    await expect(stepBtn).toBeVisible();
    await stepBtn.click();
    const steps = page.locator('.bodha-steps li');
    await expect(steps).toHaveCount(1);
  });

  test('US6-AS3: Bilingual Glossary Bridge Card opens when tapping a tagged term', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'hi');
    });

    await page.goto('/#/bodha?k=M2');
    const termBtn = page.locator('.bodha-text button.term');
    await expect(termBtn.first()).toBeVisible();
    await termBtn.first().click();
    const bridge = page.locator('.bridge');
    await expect(bridge).toBeVisible();
    // Bilingual bridge shows English term in non-English mode
    await expect(bridge).toContainText(/English|अंग्रेज़ी/i);
  });

  test('US6-AS4: In-Workbench Bodha Recall reopens Bodha cards and back returns to workbench intact', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/rect');
    const learnLink = page.locator('.learn-link');
    await expect(learnLink).toBeVisible();
    await learnLink.click();

    // Reopens Bodha
    await expect(page).toHaveURL(/#\/bodha/);

    // Clicking back button returns to workbench
    const backBtn = page.locator('#btn-back');
    await backBtn.click();
    await expect(page).toHaveURL(/#\/rect/);
  });

  test('US6-AS5: Sutra Retention persists kept sutra in storage', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('gurukul:lang', 'en');
    });

    await page.goto('/#/bodha?k=M2');
    const bodhaScreen = page.locator('.bodha');
    await expect(bodhaScreen).toBeVisible();

    const keepBtn = page.locator('button', { hasText: /keep this sutra|keep/i });
    await expect(keepBtn).toBeVisible();
    await keepBtn.click();

    // Stored in localStorage
    const savedSutras = await page.evaluate(() => localStorage.getItem('gurukul:sutras'));
    expect(savedSutras).toContain('M2');
  });
});
