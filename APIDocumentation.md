# WorkLink API Documentation

This document provides details about all the API endpoints in the WorkLink platform.

## Table of Contents

1. [Authentication Endpoints](#authentication-endpoints)
   - [Worker Authentication](#worker-authentication)
   - [Startup Authentication](#startup-authentication)
   - [Manufacturer Authentication](#manufacturer-authentication)
2. [Worker Endpoints](#worker-endpoints)
3. [Startup Endpoints](#startup-endpoints)
4. [Manufacturer Endpoints](#manufacturer-endpoints)

## Authentication Endpoints

### Worker Authentication

#### Register a Worker

- **Endpoint:** `/api/worker/signup`
- **Method:** POST
- **Description:** Register a new worker in the system
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | name | string | Yes | Full name of the worker |
  | email | string | Yes | Email address (must be unique) |
  | password | string | Yes | Password (minimum 6 characters) |
  | skills | array of strings | Yes | List of worker's skills |
  | location | object | Yes | Worker's location information |
  | location.city | string | Yes | City name |
  | location.state | string | Yes | State name |
  | profilePicture | string | No | URL to worker's profile picture |

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123",
    "skills": ["carpentry", "electrical"],
    "location": {
      "city": "New York",
      "state": "NY"
    },
    "profilePicture": "https://example.com/profile.jpg"
  }
  ```

- **Success Response:**
  - **Code:** 201 CREATED
  - **Content:**
    ```json
    {
      "token": "Bearer [JWT_TOKEN]",
      "message": "Worker SignUp successfull",
      "Worker": {
        "name": "John Doe",
        "email": "john@example.com",
        "skills": ["carpentry", "electrical"],
        "location": {
          "city": "New York",
          "state": "NY"
        },
        "profilePicture": "https://example.com/profile.jpg"
      }
    }
    ```
- **Error Responses:**
  - **Code:** 409 CONFLICT - If worker already exists
  - **Code:** 400 BAD REQUEST - If validation fails
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### Worker Login

- **Endpoint:** `/api/worker/signin`
- **Method:** POST
- **Description:** Authenticate an existing worker
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | email | string | Yes | Registered email address |
  | password | string | Yes | Account password |

  ```json
  {
    "email": "john@example.com",
    "password": "secure123"
  }
  ```

- **Success Response:**
  - **Code:** 200 OK
  - **Headers:** Authorization: Bearer [JWT_TOKEN]
  - **Content:**
    ```json
    {
      "worker": {
        "name": "John Doe",
        "email": "john@example.com",
        "skills": ["carpentry", "electrical"],
        "location": {
          "city": "New York",
          "state": "NY"
        },
        "profilePicture": "https://example.com/profile.jpg"
      }
    }
    ```
- **Error Responses:**
  - **Code:** 400 BAD REQUEST - Invalid email or missing fields
  - **Code:** 404 NOT FOUND - Worker not found
  - **Code:** 401 UNAUTHORIZED - Invalid password
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

### Startup Authentication

#### Register a Startup

- **Endpoint:** `/api/startup/signup`
- **Method:** POST
- **Description:** Register a new startup in the system
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | companyName | string | Yes | Name of the startup/company |
  | companyEmail | string | Yes | Company email address (must be unique) |
  | password | string | Yes | Password (minimum 6 characters) |
  | workSector | string | Yes | Industry or sector of the startup |
  | location | object | Yes | Startup's location information |
  | location.city | string | Yes | City name |
  | location.state | string | Yes | State name |
  | profilePicture | string | No | URL to company logo or profile image |

  ```json
  {
    "companyName": "Tech Innovators",
    "companyEmail": "info@techinnovators.com",
    "password": "secure123",
    "workSector": "Technology",
    "location": {
      "city": "San Francisco",
      "state": "CA"
    },
    "profilePicture": "https://example.com/company-logo.jpg"
  }
  ```

- **Success Response:**
  - **Code:** 201 CREATED
  - **Content:**
    ```json
    {
      "token": "Bearer [JWT_TOKEN]",
      "message": "Startup SignUp successfull",
      "Startup": {
        "companyName": "Tech Innovators",
        "companyEmail": "info@techinnovators.com",
        "workSector": "Technology",
        "location": {
          "city": "San Francisco",
          "state": "CA"
        },
        "profilePicture": "https://example.com/company-logo.jpg"
      }
    }
    ```
- **Error Responses:**
  - **Code:** 409 CONFLICT - If startup already exists
  - **Code:** 400 BAD REQUEST - If validation fails
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### Startup Login

- **Endpoint:** `/api/startup/signin`
- **Method:** POST
- **Description:** Authenticate an existing startup
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | companyEmail | string | Yes | Registered company email address |
  | password | string | Yes | Account password |

  ```json
  {
    "companyEmail": "info@techinnovators.com",
    "password": "secure123"
  }
  ```

- **Success Response:**
  - **Code:** 200 OK
  - **Headers:** Authorization: Bearer [JWT_TOKEN]
  - **Content:**
    ```json
    {
      "StartUp": {
        "companyName": "Tech Innovators",
        "companyEmail": "info@techinnovators.com",
        "workSector": "Technology",
        "location": {
          "city": "San Francisco",
          "state": "CA"
        },
        "profilePicture": "https://example.com/company-logo.jpg"
      }
    }
    ```
- **Error Responses:**
  - **Code:** 400 BAD REQUEST - Invalid email or missing fields
  - **Code:** 404 NOT FOUND - Startup not found
  - **Code:** 401 UNAUTHORIZED - Invalid password
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

### Manufacturer Authentication

#### Register a Manufacturer

- **Endpoint:** `/api/manufacturer/signup`
- **Method:** POST
- **Description:** Register a new manufacturer in the system
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | companyName | string | Yes | Name of the manufacturing company |
  | companyEmail | string | Yes | Company email address (must be unique) |
  | password | string | Yes | Password (minimum 6 characters) |
  | workSector | string | Yes | Manufacturing sector or industry |
  | machines | array of objects | Yes | List of machines owned by manufacturer |
  | machines[].name | string | Yes | Name of the machine |
  | machines[].isAvailable | boolean | Yes | Availability status (default: true) |
  | machines[].price | number | Yes | Rental price per hour/day |
  | location | object | Yes | Manufacturer's location information |
  | location.city | string | Yes | City name |
  | location.state | string | Yes | State name |
  | profilePicture | string | No | URL to company logo or profile image |

  ```json
  {
    "companyName": "Industrial Solutions",
    "companyEmail": "info@industrialsolutions.com",
    "password": "secure123",
    "workSector": "Manufacturing",
    "machines": [
      {
        "name": "CNC Machine",
        "isAvailable": true,
        "price": 250
      }
    ],
    "location": {
      "city": "Detroit",
      "state": "MI"
    },
    "profilePicture": "https://example.com/manufacturer-logo.jpg"
  }
  ```

- **Success Response:**
  - **Code:** 201 CREATED
  - **Content:**
    ```json
    {
      "token": "Bearer [JWT_TOKEN]",
      "message": "Manufacturer SignUp successfull",
      "Manufacturer": {
        "companyName": "Industrial Solutions",
        "companyEmail": "info@industrialsolutions.com",
        "workSector": "Manufacturing",
        "location": {
          "city": "Detroit",
          "state": "MI"
        },
        "profilePicture": "https://example.com/manufacturer-logo.jpg",
        "machines": [
          {
            "name": "CNC Machine",
            "isAvailable": true,
            "price": 250
          }
        ]
      }
    }
    ```
- **Error Responses:**
  - **Code:** 409 CONFLICT - If manufacturer already exists
  - **Code:** 400 BAD REQUEST - If validation fails
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### Manufacturer Login

- **Endpoint:** `/api/manufacturer/signin`
- **Method:** POST
- **Description:** Authenticate an existing manufacturer
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | companyEmail | string | Yes | Registered company email address |
  | password | string | Yes | Account password |

  ```json
  {
    "companyEmail": "info@industrialsolutions.com",
    "password": "secure123"
  }
  ```

- **Success Response:**
  - **Code:** 200 OK
  - **Headers:** Authorization: Bearer [JWT_TOKEN]
  - **Content:**
    ```json
    {
      "Manufacturer": {
        "companyName": "Industrial Solutions",
        "companyEmail": "info@industrialsolutions.com",
        "workSector": "Manufacturing",
        "location": {
          "city": "Detroit",
          "state": "MI"
        },
        "profilePicture": "https://example.com/manufacturer-logo.jpg",
        "machines": [
          {
            "name": "CNC Machine",
            "isAvailable": true,
            "price": 250
          }
        ]
      }
    }
    ```
- **Error Responses:**
  - **Code:** 400 BAD REQUEST - Invalid email or missing fields
  - **Code:** 404 NOT FOUND - Manufacturer not found
  - **Code:** 401 UNAUTHORIZED - Invalid password
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

## Worker Endpoints

#### Get Available Gigs

- **Endpoint:** `/api/worker/getGigs`
- **Method:** GET
- **Description:** Retrieves all available gigs for a worker (gigs that have not reached their worker limit and that the worker has not applied to)
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "gigsToShow": [
        {
          "_id": "gig_id",
          "companyName": "Company Name",
          "location": {
            "city": "City",
            "state": "State"
          },
          "skillsRequired": ["skill1", "skill2"],
          "pay": 100,
          "description": "Job description",
          "workerLimit": 5,
          "appliedWorkers": []
        }
      ]
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Worker not found
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### Get Worker Profile

- **Endpoint:** `/api/worker/getProfile`
- **Method:** GET
- **Description:** Retrieves the profile information of the authenticated worker
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "worker": {
        "name": "John Doe",
        "email": "john@example.com",
        "skills": ["carpentry", "electrical"],
        "location": {
          "city": "New York",
          "state": "NY"
        },
        "profilePicture": "https://example.com/profile.jpg"
      }
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Worker not found
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### Edit Worker Profile

- **Endpoint:** `/api/worker/editProfile`
- **Method:** POST
- **Description:** Updates the profile information of the authenticated worker
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | name | string | No | Updated worker name |
  | email | string | No | Updated email address |
  | skills | array of strings | No | Updated list of skills |
  | location | object | No | Updated location information |
  | location.city | string | No | Updated city name |
  | location.state | string | No | Updated state name |
  | profilePicture | string | No | Updated profile picture URL |

  ```json
  {
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "skills": ["carpentry", "electrical", "plumbing"],
    "location": {
      "city": "Chicago",
      "state": "IL"
    },
    "profilePicture": "https://example.com/new-profile.jpg"
  }
  ```

- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "worker": {
        "name": "John Smith",
        "email": "johnsmith@example.com",
        "skills": ["carpentry", "electrical", "plumbing"],
        "location": {
          "city": "Chicago",
          "state": "IL"
        },
        "profilePicture": "https://example.com/new-profile.jpg"
      }
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Worker not found
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### Apply to Gig

- **Endpoint:** `/api/worker/applyToGig`
- **Method:** POST
- **Description:** Allows a worker to apply to a specific gig
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | gigId | string | Yes | ID of the gig to apply to |

  ```json
  {
    "gigId": "gig_id"
  }
  ```

- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "Applied to gig"
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Worker or Gig not found
  - **Code:** 409 CONFLICT - Worker already applied or worker limit reached
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

## Startup Endpoints

#### Create a Gig

- **Endpoint:** `/api/startup/createGig`
- **Method:** POST
- **Description:** Creates a new gig for workers to apply to
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | location | object | Yes | Location information for the gig |
  | location.city | string | Yes | City where the gig is located |
  | location.state | string | Yes | State where the gig is located |
  | skillsRequired | array of strings | Yes | Skills needed for the gig |
  | pay | number | Yes | Payment amount for the gig |
  | description | string | Yes | Detailed description of the work |
  | workerLimit | number | Yes | Maximum number of workers that can be accepted |

  ```json
  {
    "location": {
      "city": "Boston",
      "state": "MA"
    },
    "skillsRequired": ["web development", "design"],
    "pay": 500,
    "description": "Website development project",
    "workerLimit": 3
  }
  ```

- **Success Response:**
  - **Code:** 201 CREATED
  - **Content:**
    ```json
    {
      "message": "Gig created"
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Startup not found
  - **Code:** 400 BAD REQUEST - Invalid gig data
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### Delete a Gig

- **Endpoint:** `/api/startup/deleteGig`
- **Method:** DELETE
- **Description:** Deletes an existing gig created by the startup
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | id | string | Yes | ID of the gig to delete |

  ```json
  {
    "id": "gig_id"
  }
  ```

- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "Gig deleted"
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Startup or Gig not found
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### View Your Gigs

- **Endpoint:** `/api/startup/yourGigs`
- **Method:** GET
- **Description:** Retrieves all gigs created by the authenticated startup
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "gigs": [
        {
          "_id": "gig_id",
          "companyName": "Tech Innovators",
          "location": {
            "city": "Boston",
            "state": "MA"
          },
          "skillsRequired": ["web development", "design"],
          "pay": 500,
          "description": "Website development project",
          "workerLimit": 3,
          "appliedWorkers": ["worker_id1", "worker_id2"]
        }
      ]
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Startup not found
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### View Available Machines

- **Endpoint:** `/api/startup/showMachines`
- **Method:** GET
- **Description:** Retrieves all available machines from manufacturers
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "machines": [
        {
          "companyName": "Industrial Solutions",
          "location": {
            "city": "Detroit",
            "state": "MI"
          },
          "machines": [
            {
              "_id": "machine_id",
              "name": "CNC Machine",
              "isAvailable": true,
              "price": 250
            }
          ]
        }
      ]
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Startup not found
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### Apply to Use a Machine

- **Endpoint:** `/api/startup/applyToMachines`
- **Method:** POST
- **Description:** Allows a startup to apply to use a specific machine
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | machineId | string | Yes | ID of the machine to apply for |

  ```json
  {
    "machineId": "machine_id"
  }
  ```

- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "Applied to machine"
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Startup or Machine not found
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

## Manufacturer Endpoints

#### Create a Gig

- **Endpoint:** `/api/manufacturer/createGig`
- **Method:** POST
- **Description:** Creates a new gig for workers to apply to
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | location | object | Yes | Location information for the gig |
  | location.city | string | Yes | City where the gig is located |
  | location.state | string | Yes | State where the gig is located |
  | skillsRequired | array of strings | Yes | Skills needed for the gig |
  | pay | number | Yes | Payment amount for the gig |
  | description | string | Yes | Detailed description of the work |
  | workerLimit | number | Yes | Maximum number of workers that can be accepted |

  ```json
  {
    "location": {
      "city": "Detroit",
      "state": "MI"
    },
    "skillsRequired": ["machining", "assembly"],
    "pay": 300,
    "description": "Manufacturing assembly project",
    "workerLimit": 5
  }
  ```

- **Success Response:**
  - **Code:** 201 CREATED
  - **Content:**
    ```json
    {
      "message": "Gig created"
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Manufacturer not found
  - **Code:** 400 BAD REQUEST - Invalid gig data
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### Delete a Gig

- **Endpoint:** `/api/manufacturer/deleteGig`
- **Method:** DELETE
- **Description:** Deletes an existing gig created by the manufacturer
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | id | string | Yes | ID of the gig to delete |

  ```json
  {
    "id": "gig_id"
  }
  ```

- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "Gig deleted"
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Manufacturer or Gig not found
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### View Your Gigs

- **Endpoint:** `/api/manufacturer/yourGigs`
- **Method:** GET
- **Description:** Retrieves all gigs created by the authenticated manufacturer
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "gigs": [
        {
          "_id": "gig_id",
          "companyName": "Industrial Solutions",
          "location": {
            "city": "Detroit",
            "state": "MI"
          },
          "skillsRequired": ["machining", "assembly"],
          "pay": 300,
          "description": "Manufacturing assembly project",
          "workerLimit": 5,
          "appliedWorkers": ["worker_id1", "worker_id2", "worker_id3"]
        }
      ]
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Manufacturer not found
  - **Code:** 500 INTERNAL SERVER ERROR - Server error

#### Toggle Machine Availability

- **Endpoint:** `/api/manufacturer/toggleMachineAvailability`
- **Method:** POST
- **Description:** Toggles the availability status of a machine (available/unavailable)
- **Headers Required:** Authorization: Bearer [JWT_TOKEN]
- **Request Body:**
  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | machineId | string | Yes | ID of the machine to toggle availability |

  ```json
  {
    "machineId": "machine_id"
  }
  ```

- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "Machine availability toggled",
      "data": {
        // Full manufacturer data with updated machine status
      }
    }
    ```
- **Error Responses:**
  - **Code:** 401 UNAUTHORIZED - Invalid or missing token
  - **Code:** 404 NOT FOUND - Manufacturer not found
  - **Code:** 500 INTERNAL SERVER ERROR - Server error
