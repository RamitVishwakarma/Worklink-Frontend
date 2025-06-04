import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';
import { UserType } from '@/lib/types'; // Assuming UserType is defined in types

interface WithAuthProps {
  allowedUserTypes?: UserType[]; // Optional: specify which user types can access
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options?: WithAuthProps
) => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();
    const { user, token, isLoading } = useAuthStore();

    useEffect(() => {
      if (!isLoading && !token) {
        router.replace('/signin'); // Redirect to signin if not authenticated
      } else if (!isLoading && token && user && options?.allowedUserTypes) {
        // If allowedUserTypes are specified, check if the current user's type is allowed
        if (!options.allowedUserTypes.includes(user.userType)) {
          // Redirect to a generic dashboard or home page if user type not allowed
          // Or, you could redirect to a specific "unauthorized" page
          router.replace('/');
        }
      }
    }, [user, token, isLoading, router, options?.allowedUserTypes]);

    if (isLoading || !token) {
      // You can render a loading spinner here
      return <div>Loading...</div>;
    }

    // If allowedUserTypes are specified and the user's type is not in the list,
    // and we haven't redirected yet (e.g. loading was true before),
    // prevent rendering the component.
    if (
      user &&
      options?.allowedUserTypes &&
      !options.allowedUserTypes.includes(user.userType)
    ) {
      // This check is a bit redundant due to useEffect but acts as a safeguard
      return <div>Unauthorized Access</div>; // Or redirect, or null
    }

    return <WrappedComponent {...props} />;
  };

  // Set a display name for the HOC for better debugging
  ComponentWithAuth.displayName = `WithAuth(${getDisplayName(
    WrappedComponent
  )})`;

  return ComponentWithAuth;
};

// Helper function to get the display name of a component
function getDisplayName<P>(WrappedComponent: ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
