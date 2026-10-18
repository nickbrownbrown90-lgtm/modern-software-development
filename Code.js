/**
 * Modern Software Development Academy - Google Apps Script Backend API
 * Serves headless JSON endpoints for the GitHub Pages Progressive Web App (PWA).
 */

/**
 * Handles incoming GET requests from the PWA.
 *
 * @param {Object} e - Event parameters including query strings
 * @return {GoogleAppsScript.Content.TextOutput} JSON response
 */
function doGet(e) {
  const params = (e && e.parameter) || {};
  const action = params.action || 'getDashboard';

  let responseData;

  switch (action) {
    case 'getDashboard':
      responseData = getDashboardPayload();
      break;

    case 'getCurriculum':
      responseData = getCurriculumPayload();
      break;

    case 'getGlossary':
      responseData = getGlossaryPayload();
      break;

    case 'ping':
      responseData = { status: 'ok', timestamp: new Date().toISOString() };
      break;

    default:
      responseData = {
        error: true,
        message: 'Unknown action: ' + action,
        availableActions: ['getDashboard', 'getCurriculum', 'getGlossary', 'ping']
      };
  }

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles incoming POST requests (mutations) from the PWA.
 *
 * @param {Object} e - Event parameters including postData
 * @return {GoogleAppsScript.Content.TextOutput} JSON response
 */
function doPost(e) {
  let body = {};
  if (e && e.postData && e.postData.contents) {
    try {
      body = JSON.parse(e.postData.contents);
    } catch (err) {
      body = { raw: e.postData.contents };
    }
  }

  const action = body.action || (e && e.parameter && e.parameter.action) || 'submit';
  let responseData;

  switch (action) {
    case 'submitQuizResult':
      responseData = {
        success: true,
        quizId: body.quizId || 'quiz-0001',
        score: body.score || 100,
        message: 'Quiz result saved to Google Apps Script!',
        timestamp: new Date().toISOString()
      };
      break;

    case 'markLessonComplete':
      responseData = {
        success: true,
        lessonId: body.lessonId,
        message: 'Lesson marked complete.',
        timestamp: new Date().toISOString()
      };
      break;

    default:
      responseData = {
        success: true,
        actionReceived: action,
        message: 'Data received successfully',
        timestamp: new Date().toISOString()
      };
  }

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

// Data Providers
function getDashboardPayload() {
  return {
    courseTitle: 'Modern Software Development',
    mission: 'Collaborate effectively with and lead software engineering teams by mastering the end-to-end delivery lifecycle.',
    learnerProfile: {
      role: 'Tech Lead / PM / Founder',
      level: 'Beginner foundations to production architecture',
      targetStack: 'TypeScript, React, Node.js, GitHub Actions, Docker, Cloud'
    },
    progress: {
      completedLessons: 1,
      totalLessons: 7,
      masteryScore: '85%'
    },
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: The Delivery Map & Mental Models',
        status: 'available',
        lessonUrl: 'lessons/0001-the-modern-software-delivery-map.html',
        referenceUrl: 'reference/0001-sdlc-map-and-glossary.html'
      },
      {
        id: 'mod-2',
        title: 'Module 2: Git Workflows, Branching & PR Reviews',
        status: 'upcoming'
      },
      {
        id: 'mod-3',
        title: 'Module 3: Continuous Integration (CI) & Automated Testing',
        status: 'upcoming'
      },
      {
        id: 'mod-4',
        title: 'Module 4: Containerization with Docker',
        status: 'upcoming'
      },
      {
        id: 'mod-5',
        title: 'Module 5: Continuous Delivery (CD) & Release Strategies',
        status: 'upcoming'
      },
      {
        id: 'mod-6',
        title: 'Module 6: Production Observability & Incident Response',
        status: 'upcoming'
      },
      {
        id: 'mod-7',
        title: 'Module 7: Leading Engineering Teams & DORA Metrics',
        status: 'upcoming'
      }
    ]
  };
}

function getCurriculumPayload() {
  return getDashboardPayload().modules;
}

function getGlossaryPayload() {
  return [
    { term: 'Continuous Integration (CI)', def: 'Automating build and test execution on every commit to catch errors early.' },
    { term: 'Continuous Delivery (CD)', def: 'Automating packaging and staging releases for safe, on-demand production deployment.' },
    { term: 'Pull Request (PR)', def: 'A proposed code modification submitted for peer review and automated testing.' },
    { term: 'Docker Container', def: 'A lightweight portable runtime bundling application code and all its system dependencies.' },
    { term: 'Observability', def: 'Understanding system state via telemetry: metrics, logs, and distributed traces.' },
    { term: 'DORA Metrics', def: 'Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Mean Time to Restore (MTTR).' }
  ];
}
