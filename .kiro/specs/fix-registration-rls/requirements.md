# Requirements Document

## Introduction

Fix the user registration process that is currently failing due to Row Level Security (RLS) policy violations when creating company records in Supabase. The error "new row violates row-level security policy for table 'companies'" prevents users from completing registration.

## Glossary

- **RLS**: Row Level Security - Supabase security feature that controls data access at the row level
- **Auth_Context**: Authentication context that manages user sessions and authentication state
- **Company_Record**: Database record containing company information linked to a user profile
- **Registration_Flow**: Multi-step process where users create accounts and provide company information

## Requirements

### Requirement 1: Fix Company Creation During Registration

**User Story:** As a new user, I want to complete the registration process successfully, so that I can create an account and access the platform.

#### Acceptance Criteria

1. WHEN a user completes the registration form with valid data, THE System SHALL create both the user profile and company record successfully
2. WHEN the company record is being created, THE System SHALL ensure proper RLS policy compliance for new user sessions
3. WHEN registration fails due to RLS violations, THE System SHALL provide clear error handling and retry mechanisms
4. THE System SHALL maintain data consistency between user profiles and company records during registration

### Requirement 2: Improve Registration Error Handling

**User Story:** As a user experiencing registration issues, I want clear error messages and guidance, so that I can understand and resolve any problems.

#### Acceptance Criteria

1. WHEN registration fails due to database errors, THE System SHALL display user-friendly error messages in Serbian language
2. WHEN RLS policy violations occur, THE System SHALL provide specific guidance on how to resolve the issue
3. WHEN network or connection issues occur, THE System SHALL offer retry options
4. THE System SHALL log detailed error information for debugging while showing simplified messages to users

### Requirement 3: Validate Registration Data Flow

**User Story:** As a system administrator, I want the registration process to be reliable and secure, so that new users can join the platform without issues.

#### Acceptance Criteria

1. THE System SHALL validate that user profiles are created before attempting company record creation
2. THE System SHALL ensure proper session establishment before database operations
3. WHEN registration is successful, THE System SHALL redirect users to the appropriate confirmation page
4. THE System SHALL maintain audit trails of registration attempts and outcomes