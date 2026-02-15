# Implementation Plan: Fix Registration RLS

## Overview

Fix the registration process by addressing Row Level Security policy violations and improving error handling for a better user experience.

## Tasks

- [ ] 1. Update Supabase RLS policies for registration flow
  - Modify companies table RLS policy to handle registration properly
  - Create secure registration function that bypasses RLS temporarily
  - Test policy changes with registration scenarios
  - _Requirements: 1.1, 1.2, 3.1_

- [ ] 2. Improve AuthContext registration handling
  - [ ] 2.1 Add session validation before company creation
    - Check if user session is properly established
    - Add retry logic for session establishment
    - _Requirements: 1.2, 3.2_

  - [ ] 2.2 Implement better error handling
    - Add specific error messages for RLS violations
    - Translate error messages to Serbian
    - Add retry mechanisms for failed operations
    - _Requirements: 2.1, 2.2, 2.3_

  - [ ] 2.3 Add transaction-like behavior
    - Ensure atomic registration operations
    - Handle rollback scenarios for partial failures
    - _Requirements: 1.4, 3.4_

- [ ] 3. Update registration form user experience
  - [ ] 3.1 Improve error display
    - Show user-friendly error messages in Serbian
    - Add specific guidance for common issues
    - _Requirements: 2.1, 2.2_

  - [ ] 3.2 Add better loading states
    - Show progress during registration steps
    - Provide feedback during database operations
    - _Requirements: 2.3_

  - [ ] 3.3 Add retry functionality
    - Allow users to retry failed registrations
    - Preserve form data during retries
    - _Requirements: 2.3_

- [ ] 4. Test registration flow
  - [ ] 4.1 Test successful registration scenarios
    - Test with valid company data
    - Verify both profile and company creation
    - _Requirements: 1.1, 1.4_

  - [ ] 4.2 Test error scenarios
    - Test RLS policy compliance
    - Test network failure handling
    - Test invalid data handling
    - _Requirements: 2.1, 2.2, 2.3_

  - [ ] 4.3 Test session management
    - Test registration with various session states
    - Test retry mechanisms
    - _Requirements: 3.1, 3.2_

- [ ] 5. Checkpoint - Verify registration works end-to-end
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Focus on fixing the immediate RLS policy issue first
- Ensure backward compatibility with existing users
- Test thoroughly with both demo and real Supabase connections
- Maintain security while fixing the registration flow