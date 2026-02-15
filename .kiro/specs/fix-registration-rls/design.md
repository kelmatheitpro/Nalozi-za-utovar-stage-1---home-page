# Design Document

## Overview

The registration failure is caused by Row Level Security (RLS) policy violations in Supabase when creating company records. The issue occurs because the RLS policy checks `auth.uid() = user_id`, but during registration, the user session may not be fully established when the company record creation is attempted.

## Architecture

The registration flow involves multiple database operations that must be executed in the correct sequence with proper session management:

1. **User Signup** → Creates auth.users record
2. **Profile Creation** → Triggered automatically via database trigger
3. **Company Creation** → Manual insertion that's failing due to RLS

## Root Cause Analysis

The RLS policy for companies table:
```sql
CREATE POLICY "Users can insert own company" ON public.companies
    FOR INSERT WITH CHECK (auth.uid() = user_id);
```

This policy fails because:
1. The user session might not be immediately available after signup
2. The `auth.uid()` function may return null during the registration process
3. The company insertion happens too quickly after user creation

## Components and Interfaces

### 1. Database Schema Updates
- **Modified RLS Policies**: Update company insertion policy to handle registration flow
- **Registration Function**: Create a secure function for registration that bypasses RLS temporarily
- **Session Management**: Ensure proper session establishment before company creation

### 2. Authentication Context Updates
- **Improved Error Handling**: Better error messages and retry logic
- **Session Validation**: Verify session before attempting company creation
- **Transaction Management**: Ensure atomic operations during registration

### 3. Registration Form Updates
- **Error Display**: Show user-friendly error messages in Serbian
- **Loading States**: Better feedback during registration process
- **Retry Mechanism**: Allow users to retry failed registrations

## Data Models

### Registration Request
```typescript
interface RegistrationData {
  email: string
  password: string
  name: string
  company: {
    name: string
    registrationNumber: string
    category: CompanyCategory
    country: string
    city: string
    address: string
    phone: string
    email: string
  }
}
```

### Registration Response
```typescript
interface RegistrationResult {
  success: boolean
  user?: User
  profile?: AppUser
  error?: string
  requiresEmailConfirmation?: boolean
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Registration Atomicity
*For any* valid registration data, either both the user profile and company record are created successfully, or neither is created (atomic transaction)
**Validates: Requirements 1.1, 1.4**

### Property 2: RLS Policy Compliance
*For any* company record creation during registration, the operation should succeed when the user owns the record being created
**Validates: Requirements 1.2**

### Property 3: Error Message Clarity
*For any* registration failure, the system should provide a user-friendly error message in Serbian language
**Validates: Requirements 2.1, 2.2**

### Property 4: Session Validation
*For any* database operation during registration, the user session should be properly established and validated
**Validates: Requirements 3.1, 3.2**

## Error Handling

### Database Errors
- **RLS Violations**: Retry with proper session establishment
- **Constraint Violations**: Validate data before submission
- **Connection Issues**: Implement exponential backoff retry

### User Experience
- **Loading States**: Show progress during multi-step registration
- **Error Recovery**: Allow users to correct and retry
- **Success Confirmation**: Clear feedback when registration succeeds

## Testing Strategy

### Unit Tests
- Test registration form validation
- Test error message display
- Test retry mechanisms
- Test data transformation

### Property-Based Tests
- Test registration atomicity across various input combinations
- Test RLS policy compliance with different user scenarios
- Test error handling with various failure conditions
- Test session validation across different timing scenarios

### Integration Tests
- Test complete registration flow end-to-end
- Test database transaction rollback on failures
- Test Supabase authentication integration
- Test email confirmation flow (if enabled)

**Property Test Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with: **Feature: fix-registration-rls, Property {number}: {property_text}**
- Use fast-check or similar library for TypeScript property testing