## Frontend Development Tasks for WorkLink

This document outlines the tasks required to create a modern and engaging frontend for the WorkLink project. The frontend will be built using Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Design Theme: Industrial Precision

**Inspiration:** Industrial precision meets raw human effort

**Theme Elements:**

- **Colors:** Gunmetal grey (#2C3E50, #34495E), navy blue (#1E3A8A, #1E40AF), safety yellow (#FDE047, #EAB308)
- **Textures:** Brushed steel patterns, gear motifs, metal grid backgrounds, industrial textures
- **Typography:** Bold slab-serif or condensed sans-serif fonts (e.g., Oswald, Bebas Neue, Inter for body text)
- **Vibe:** Serious, no-nonsense, trustworthy, professional
- **Purpose:** Building trust with industrial manufacturers and rugged tradespeople

**Design Principles:**

- Clean, functional layouts that prioritize usability
- Strong contrast and readability for industrial environments
- Consistent use of safety colors for important actions
- Metal-inspired UI elements (buttons, cards, borders)
- Grid-based layouts reminiscent of industrial blueprints
- Subtle gear and machinery iconography where appropriate

### I. Project Setup & Configuration (Estimated Time: X hours)

- [x] **Task 1.1:** Initialize Next.js Project with TypeScript
  - Description: Set up a new Next.js project using `create-next-app` with TypeScript.
  - Acceptance Criteria: A new Next.js project is created and runs successfully.
- [x] **Task 1.2:** Integrate Tailwind CSS
  - Description: Install and configure Tailwind CSS for styling.
  - Acceptance Criteria: Tailwind CSS is set up, and utility classes can be used.
- [x] **Task 1.3:** Integrate Framer Motion
  - Description: Install and configure Framer Motion for animations.
  - Acceptance Criteria: Framer Motion is set up, and basic animations can be implemented.
- [x] **Task 1.4:** Integrate shadcn/ui
  - Description: Install and configure shadcn/ui for UI components.
  - Acceptance Criteria: shadcn/ui is set up, and components can be used.
- [x] **Task 1.5:** Set up ESLint and Prettier
  - Description: Configure ESLint and Prettier for code linting and formatting.
  - Acceptance Criteria: ESLint and Prettier are configured and working correctly.
- [x] **Task 1.6:** Define Project Structure
  - Description: Establish a clear and scalable folder structure for components, pages, services, etc.
  - Acceptance Criteria: A well-defined project structure is in place.
- [x] **Task 1.7:** Configure Industrial Theme in Tailwind CSS - NEW
  - Description: Customize Tailwind CSS configuration to include industrial color palette, typography, and custom utilities for the industrial aesthetic.
  - Acceptance Criteria: Tailwind is configured with custom industrial colors, fonts, and utility classes for metal textures and grid patterns.

### II. Core Authentication (Estimated Time: X hours)

- [x] **Task 2.1:** Design Authentication Pages (Login, Signup) - COMPLETE
  - Description: Create visually appealing and user-friendly designs for login and signup pages with industrial theme.
  - Acceptance Criteria: Authentication pages follow industrial design principles with gunmetal grey, navy blue, and safety yellow color scheme. ✅ COMPLETED: SignupForm and SigninForm fully converted to industrial theme with IndustrialCard, IndustrialInput, IndustrialIcon components, proper industrial styling, and enhanced UX.
- [x] **Task 2.2:** Implement Worker Signup Page - COMPLETE (FORMS HANDLE ALL USER TYPES)
  - Description: Develop the worker signup page with form validation, API integration, and industrial styling.
  - Acceptance Criteria: Workers can successfully sign up with industrial-themed UI. ✅ COMPLETED: SignupForm handles all user types including workers with proper validation and industrial styling.
- [x] **Task 2.3:** Implement Worker Login Page - COMPLETE (FORMS HANDLE ALL USER TYPES)
  - Description: Develop the worker login page with form validation, API integration, and industrial styling.
  - Acceptance Criteria: Workers can successfully log in with industrial-themed UI. ✅ COMPLETED: SigninForm handles all user types including workers with proper validation and industrial styling.
- [x] **Task 2.4:** Implement Startup Signup Page - COMPLETE (FORMS HANDLE ALL USER TYPES)
  - Description: Develop the startup signup page with form validation, API integration, and industrial styling.
  - Acceptance Criteria: Startups can successfully sign up with industrial-themed UI. ✅ COMPLETED: SignupForm handles all user types including startups with proper validation and industrial styling.
- [x] **Task 2.5:** Implement Startup Login Page - COMPLETE (FORMS HANDLE ALL USER TYPES)
  - Description: Develop the startup login page with form validation, API integration, and industrial styling.
  - Acceptance Criteria: Startups can successfully log in with industrial-themed UI. ✅ COMPLETED: SigninForm handles all user types including startups with proper validation and industrial styling.
- [x] **Task 2.6:** Implement Manufacturer Signup Page - COMPLETE (FORMS HANDLE ALL USER TYPES)
  - Description: Develop the manufacturer signup page with form validation, API integration, and industrial styling.
  - Acceptance Criteria: Manufacturers can successfully sign up with industrial-themed UI. ✅ COMPLETED: SignupForm handles all user types including manufacturers with proper validation and industrial styling.
- [x] **Task 2.7:** Implement Manufacturer Login Page - COMPLETE (FORMS HANDLE ALL USER TYPES)
  - Description: Develop the manufacturer login page with form validation, API integration, and industrial styling.
  - Acceptance Criteria: Manufacturers can successfully log in with industrial-themed UI. ✅ COMPLETED: SigninForm handles all user types including manufacturers with proper validation and industrial styling.
- [x] **Task 2.8:** Implement JWT Handling and Protected Routes
  - Description: Manage JWT tokens for authentication and create protected routes.
  - Acceptance Criteria: Authenticated users can access protected routes, and unauthenticated users are redirected.
- [ ] **Task 2.9:** Add Animations to Authentication Flow - REWORK FOR INDUSTRIAL THEME
  - Description: Enhance the user experience with smooth transitions and animations using Framer Motion that complement the industrial theme.
  - Acceptance Criteria: Authentication pages have engaging animations with industrial feel.

### III. Worker Dashboard & Functionality (Estimated Time: X hours)

- [ ] **Task 3.1:** Design Worker Dashboard - REWORK FOR INDUSTRIAL THEME
  - Description: Design the main dashboard for workers with industrial theme, showing available gigs, applied gigs, profile, etc. Utilize shadcn/ui components with industrial styling.
  - Acceptance Criteria: Worker dashboard follows industrial design principles with metal-inspired UI elements.
- [ ] **Task 3.2:** Implement Worker Profile Page - REWORK FOR INDUSTRIAL THEME
  - Description: Develop the worker profile page with industrial styling, allowing viewing and editing of profile information.
  - Acceptance Criteria: Workers can view and update their profiles with industrial-themed interface.
- [ ] **Task 3.3:** Implement "Show Gigs" Page - REWORK FOR INDUSTRIAL THEME
  - Description: Develop a page to display available gigs with industrial styling, filtering and search functionality.
  - Acceptance Criteria: Workers can view and search for gigs with industrial-themed card layouts and gear iconography.
- [ ] **Task 3.4:** Implement "Apply to Gig" Functionality - REWORK FOR INDUSTRIAL THEME
  - Description: Allow workers to apply for gigs with industrial-styled modals and forms using safety yellow for action buttons.
  - Acceptance Criteria: Workers can apply for gigs with industrial-themed application process.
- [ ] **Task 3.5:** Implement "Applied Gigs" Page - REWORK FOR INDUSTRIAL THEME
  - Description: Display a list of gigs the worker has applied to using industrial-styled tables with metal grid backgrounds.
  - Acceptance Criteria: Workers can see their gig application status with industrial design elements.
- [x] **Task 3.6:** Implement "Get Profile" Functionality
  - Description: Allow workers to view their profile information.
  - Acceptance Criteria: Workers can retrieve and display their profile data.
- [x] **Task 3.7:** Implement "Edit Profile" Functionality
  - Description: Allow workers to edit their profile information.
  - Acceptance Criteria: Workers can update their profile data.
- [x] **Task 3.8:** Implement "Show Machines" Page (for Workers) - COMPLETE
  - Description: Display available machines from manufacturers with industrial card design and machinery iconography.
  - Acceptance Criteria: Workers can view available machines with industrial-themed interface. ✅ COMPLETED: Converted to use IndustrialCard, IndustrialIcon, IndustrialInput, IndustrialLayout with proper industrial color schemes, metal-inspired UI elements, and animations.
- [x] **Task 3.9:** Implement "Apply to Machine" Functionality (for Workers) - COMPLETE
  - Description: Allow workers to apply to use machines with industrial-styled modals using safety colors.
  - Acceptance Criteria: Workers can apply for machine usage with industrial design elements. ✅ COMPLETED: Implemented Apply button with industrial-accent variant, loading states using Loader2, and proper feedback with industrial styling.
- [ ] **Task 3.10:** Add Animations to Worker Dashboard - REWORK FOR INDUSTRIAL THEME
  - Description: Use Framer Motion for interactive elements and transitions that complement the industrial aesthetic.
  - Acceptance Criteria: Worker dashboard has engaging animations with industrial precision feel.

### IV. Startup Dashboard & Functionality (Estimated Time: X hours)

- [ ] **Task 4.1:** Design Startup Dashboard - REWORK FOR INDUSTRIAL THEME
  - Description: Design the main dashboard for startups with industrial aesthetics, showing created gigs, applications, etc.
  - Acceptance Criteria: Startup dashboard incorporates gunmetal grey, navy blue color scheme with grid-based layouts.
- [ ] **Task 4.2:** Implement Startup Profile Page - REWORK FOR INDUSTRIAL THEME
  - Description: Develop the startup profile page with industrial styling and metal-inspired UI elements.
  - Acceptance Criteria: Startups can view and update their company profiles with industrial-themed interface.
- [ ] **Task 4.3:** Implement "Create Gig" Page - REWORK FOR INDUSTRIAL THEME
  - Description: Develop a form for startups to create new gigs with industrial styling and safety yellow accent colors.
  - Acceptance Criteria: Startups can create and post new gigs with industrial-themed form design.
- [ ] **Task 4.4:** Implement "Your Gigs" Page - REWORK FOR INDUSTRIAL THEME
  - Description: Display gigs created by the startup with industrial-styled tables featuring metal grid backgrounds.
  - Acceptance Criteria: Startups can view and manage their created gigs with industrial design elements.
- [ ] **Task 4.5:** Implement "Delete Gig" Functionality - REWORK FOR INDUSTRIAL THEME
  - Description: Allow startups to delete their gigs with industrial-styled confirmation dialogs.
  - Acceptance Criteria: Startups can delete gigs with consistent industrial theming.
- [x] **Task 4.6:** Implement "Show Machines" Page (for Startups) - COMPLETE
  - Description: Display available machines from manufacturers with industrial card layouts and machinery iconography.
  - Acceptance Criteria: Startups can view available machines with industrial-themed interface. ✅ COMPLETED: Converted to use IndustrialCard, IndustrialIcon, IndustrialInput, IndustrialLayout with proper industrial color schemes, metal-inspired UI elements, and animations.
- [x] **Task 4.7:** Implement "Apply to Machines" Functionality (for Startups) - COMPLETE
  - Description: Allow startups to apply to use machines with industrial-styled modals and safety color accents.
  - Acceptance Criteria: Startups can apply for machine usage with industrial design consistency. ✅ COMPLETED: Implemented Apply button with industrial variants, loading states, and proper feedback with the industrial styling.
- [ ] **Task 4.8:** Add Animations to Startup Dashboard - REWORK FOR INDUSTRIAL THEME
  - Description: Use Framer Motion for interactive elements with industrial precision-inspired transitions.
  - Acceptance Criteria: Startup dashboard has engaging animations that complement the industrial aesthetic.

### V. Manufacturer Dashboard & Functionality (Estimated Time: X hours)

- [x] **Task 5.1:** Design Manufacturer Dashboard - COMPLETE
  - Description: Design the main dashboard for manufacturers with full industrial theming, showing listed machines, applications, etc.
  - Acceptance Criteria: Manufacturer dashboard exemplifies industrial precision with brushed steel patterns and gear motifs. ✅ COMPLETED: Enhanced with IndustrialCard, IndustrialIcon, proper industrial color schemes, animated gears, metal-inspired UI elements, and consistent industrial design language.
- [ ] **Task 5.2:** Implement Manufacturer Profile Page - REWORK FOR INDUSTRIAL THEME
  - Description: Develop the manufacturer profile page with complete industrial styling and professional appearance.
  - Acceptance Criteria: Manufacturers can view and update their company profiles with industrial-themed interface.
- [x] **Task 5.3:** Implement "Add Machine" Page - COMPLETE
  - Description: Develop a form for manufacturers to add new machines with industrial styling and machinery iconography.
  - Acceptance Criteria: Manufacturers can add new machines with industrial-themed form design. ✅ COMPLETED: Implemented comprehensive form with industrial styling, form validation, loading states, and API integration.
- [x] **Task 5.4:** Implement "Your Machines" Page - COMPLETE
  - Description: Display machines listed by the manufacturer with industrial-styled tables and metal grid backgrounds.
  - Acceptance Criteria: Manufacturers can view and manage their listed machines with industrial design elements. ✅ COMPLETED: Implemented comprehensive machine management page with industrial styling, stats cards, search/filter functionality, dropdown actions for view/toggle/delete, confirmation dialogs, and responsive design.
- [x] **Task 5.5:** Implement "Delete Machine" Functionality - COMPLETE
  - Description: Allow manufacturers to delete their machines with industrial-styled confirmation dialogs.
  - Acceptance Criteria: Manufacturers can delete machines with consistent industrial theming. ✅ COMPLETED: Implemented as part of "Your Machines" page with industrial-styled dropdown actions and confirmation dialog.
- [x] **Task 5.6:** Implement "Toggle Machine Availability" Functionality - COMPLETE
  - Description: Allow manufacturers to toggle machine availability with industrial-styled toggle switches.
  - Acceptance Criteria: Manufacturers can mark machines as available/unavailable with industrial design consistency. ✅ COMPLETED: Implemented as part of "Your Machines" page with dropdown toggle actions and loading states.
- [x] **Task 5.7:** Implement "Show Applications" Page (for Machines) - COMPLETE
  - Description: Display applications from workers and startups with industrial-styled tables and professional layout.
  - Acceptance Criteria: Manufacturers can view applications with industrial-themed interface. ✅ COMPLETED: Implemented comprehensive applications page with industrial styling, stats cards, search/filter functionality, application management, and responsive design.
- [x] **Task 5.8:** Implement "Approve/Reject Application" Functionality - COMPLETE
  - Description: Allow manufacturers to approve or reject applications with industrial-styled action buttons using safety colors.
  - Acceptance Criteria: Manufacturers can manage machine applications with industrial design elements. ✅ COMPLETED: Implemented as part of applications page with industrial-styled action buttons, confirmation dialogs, loading states, and proper feedback.
- [ ] **Task 5.9:** Add Animations to Manufacturer Dashboard - REWORK FOR INDUSTRIAL THEME
  - Description: Use Framer Motion for interactive elements with industrial precision-inspired transitions.
  - Acceptance Criteria: Manufacturer dashboard has engaging animations that complement the industrial aesthetic.

### VI. General UI/UX & Styling (Estimated Time: X hours)

- [ ] **Task 6.1:** Create a Consistent Industrial UI Kit/Design System - REWORK FOR INDUSTRIAL THEME
  - Description: Define a set of reusable UI components with industrial styling (buttons, inputs, cards, etc.) featuring gunmetal grey, navy blue, and safety yellow colors.
  - Acceptance Criteria: A comprehensive industrial UI kit is established with brushed steel patterns and gear motifs.
- [ ] **Task 6.2:** Implement Responsive Industrial Design - REWORK FOR INDUSTRIAL THEME
  - Description: Ensure the application is responsive with industrial styling that works well on various screen sizes, maintaining the metal grid aesthetic.
  - Acceptance Criteria: The application is fully responsive with consistent industrial theming across all devices.
- [x] **Task 6.3:** Implement Global State Management (e.g., Zustand, Redux Toolkit, Context API)
  - Description: Set up a global state management solution if needed for complex state sharing.
  - Acceptance Criteria: State management is implemented effectively.
- [x] **Task 6.4:** Implement Error Handling and Notifications
  - Description: Provide clear error messages and notifications to the user.
  - Acceptance Criteria: User-friendly error handling is in place.
- [ ] **Task 6.5:** Accessibility (A11y) Considerations - ENHANCE FOR INDUSTRIAL THEME
  - Description: Ensure the application is accessible to users with disabilities while maintaining industrial design principles and high contrast.
  - Acceptance Criteria: Basic A11y best practices are followed with industrial color scheme considerations.
- [ ] **Task 6.6:** Industrial Typography Implementation - NEW
  - Description: Implement Oswald, Bebas Neue, or similar bold fonts for headings and Inter for body text to achieve industrial aesthetic.
  - Acceptance Criteria: Typography system reflects industrial precision and readability in harsh environments.
- [ ] **Task 6.7:** Industrial Color Palette Implementation - NEW
  - Description: Apply gunmetal grey (#2C3E50, #34495E), navy blue (#1E3A8A, #1E40AF), and safety yellow (#FDE047, #EAB308) throughout the application.
  - Acceptance Criteria: Consistent color usage that builds trust with industrial manufacturers and tradespeople.

### VII. API Integration & Services (Estimated Time: X hours)

- [x] **Task 7.1:** Define API Service Layer
  - Description: Create a dedicated layer for handling API requests (e.g., using Axios or Fetch).
  - Acceptance Criteria: A well-structured API service layer is in place.
- **Task 7.2:** Integrate Endpoints for Worker, Startup, and Manufacturer
  - Description: Connect the frontend to all relevant backend API endpoints.
  - Acceptance Criteria: All necessary API integrations are complete and tested.

### VIII. Testing & Deployment (Estimated Time: X hours)

- **Task 8.1:** Unit Testing
  - Description: Write unit tests for critical components and functions.
  - Acceptance Criteria: Key parts of the codebase are covered by unit tests.
- **Task 8.2:** Integration Testing
  - Description: Test the interaction between different parts of the application.
  - Acceptance Criteria: Integration tests pass successfully.
- **Task 8.3:** End-to-End Testing (Optional, e.g., using Cypress or Playwright)
  - Description: Implement end-to-end tests for major user flows.
  - Acceptance Criteria: E2E tests cover critical user journeys.
- **Task 8.4:** Build and Deployment Setup
  - Description: Configure the build process and set up deployment (e.g., to Vercel, Netlify).
  - Acceptance Criteria: The application can be successfully built and deployed.

### IX. Documentation (Estimated Time: X hours)

- **Task 9.1:** Component Documentation
  - Description: Document reusable components and their props.
  - Acceptance Criteria: Component documentation is clear and up-to-date.
- **Task 9.2:** Project README Update
  - Description: Update the project README with setup instructions, development guidelines, etc.
  - Acceptance Criteria: The README is comprehensive and helpful.
