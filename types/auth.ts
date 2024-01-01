declare module "@auth/core/types" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    role?: string,
    emailVerified?: boolean,
    isVerified?: boolean
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {}
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "@auth/core/jwt"

declare module "@auth/core/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    /** OpenID ID Token */
    id?: string,
    isVerified?: boolean,
    role?: string
  }
}