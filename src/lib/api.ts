// // src/lib/api.ts
// // This connects your React frontend to Django backend

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// class MemoryBookAPI {
//   private accessToken: string | null = null
  
//   constructor() {
//     // Load token from localStorage on startup
//     this.accessToken = localStorage.getItem('access_token')
//   }
  
//   // ============ AUTH ============
  
//   async register(email: string, password: string, name: string) {
//     const res = await fetch(`${API_URL}/auth/register/`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ 
//         username: email, 
//         email, 
//         password,
//         first_name: name.split(' ')[0],
//         last_name: name.split(' ').slice(1).join(' ')
//       })
//     })
    
//     if (!res.ok) throw new Error('Registration failed')
//     const data = await res.json()
    
//     // Auto-login after registration
//     return this.login(email, password)
//   }
  
//   async login(email: string, password: string) {
//     const res = await fetch(`${API_URL}/auth/login/`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username: email, password })
//     })
    
//     if (!res.ok) throw new Error('Login failed')
//     const data = await res.json()
    
//     this.accessToken = data.access
//     localStorage.setItem('access_token', data.access)
//     localStorage.setItem('refresh_token', data.refresh)
    
//     return data
//   }
  
//   async logout() {
//     this.accessToken = null
//     localStorage.removeItem('access_token')
//     localStorage.removeItem('refresh_token')
//   }
  
//   async getProfile() {
//     return this.request('/auth/profile/')
//   }
  
//   // ============ EVENTS ============
  
//   async createEvent(data: {
//     title: string
//     date: string
//     description?: string
//     template?: string
//     primary_color?: string
//   }) {
//     return this.request('/events/', {
//       method: 'POST',
//       body: JSON.stringify({
//         title: data.title,
//         date: data.date,
//         description: data.description || '',
//         is_published: true,
//         settings: {
//           theme: data.template || 'elegant',
//           primary_color: data.primary_color || '#d4a574'
//         }
//       })
//     })
//   }
  
//   async getMyEvents() {
//     return this.request('/events/')
//   }
  
//   async getEvent(id: string) {
//     return this.request(`/events/${id}/`)
//   }
  
//   async getEventBySlug(slug: string) {
//     return this.request(`/events/by-slug/${slug}/`)
//   }
  
//   async getEventStats(id: string) {
//     return this.request(`/events/${id}/stats/`)
//   }
  
//   // ============ MEMORIES (Photos & Comments) ============
  
//   async uploadPhotos(eventId: string, files: File[], caption?: string) {
//     const formData = new FormData()
//     files.forEach(file => formData.append('file', file))
//     formData.append('event', eventId)
//     if (caption) formData.append('content', caption)
//     formData.append('type', 'photo')
    
//     return this.request('/memories/', {
//       method: 'POST',
//       body: formData,
//       headers: {} // Don't set Content-Type, browser will set with boundary
//     })
//   }
  
//   async getMemories(eventId: string, approvedOnly: boolean = true) {
//     if (approvedOnly) {
//       return this.request(`/memories/event/${eventId}/`)
//     }
//     return this.request(`/memories/?event_id=${eventId}`)
//   }
  
//   async moderateMemory(memoryId: string, status: 'approved' | 'rejected') {
//     return this.request(`/memories/${memoryId}/moderate/`, {
//       method: 'PUT',
//       body: JSON.stringify({ status })
//     })
//   }
  
//   async deleteMemory(memoryId: string) {
//     return this.request(`/memories/${memoryId}/`, { method: 'DELETE' })
//   }
  
//   // ============ GUEST ACTIONS (no auth needed) ============
  
//   async joinAsGuest(slug: string, name: string, email?: string, accessCode?: string) {
//     const body: any = { name }
//     if (email) body.email = email
//     if (accessCode) body.access_code = accessCode
    
//     return this.request(`/events/by-slug/${slug}/join/`, {
//       method: 'POST',
//       body: JSON.stringify(body)
//     })
//   }
  
//   // ============ PRIVATE HELPERS ============
  
//   private async request(endpoint: string, options: RequestInit = {}) {
//     const headers: HeadersInit = {
//       'Content-Type': 'application/json',
//       ...options.headers as Record<string, string>
//     }
    
//     if (this.accessToken) {
//       headers['Authorization'] = `Bearer ${this.accessToken}`
//     }
    
//     const res = await fetch(`${API_URL}${endpoint}`, {
//       ...options,
//       headers
//     })
    
//     // Token expired? Try to refresh
//     if (res.status === 401) {
//       const refreshed = await this.refreshToken()
//       if (refreshed) {
//         // Retry with new token
//         headers['Authorization'] = `Bearer ${this.accessToken}`
//         const retry = await fetch(`${API_URL}${endpoint}`, {
//           ...options,
//           headers
//         })
//         return retry.json()
//       }
//       throw new Error('Session expired. Please login again.')
//     }
    
//     if (!res.ok) {
//       const error = await res.text()
//       throw new Error(error)
//     }
    
//     return res.json()
//   }
  
//   private async refreshToken(): Promise<boolean> {
//     const refresh = localStorage.getItem('refresh_token')
//     if (!refresh) return false
    
//     try {
//       const res = await fetch(`${API_URL}/auth/refresh/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ refresh })
//       })
      
//       if (res.ok) {
//         const data = await res.json()
//         this.accessToken = data.access
//         localStorage.setItem('access_token', data.access)
//         return true
//       }
//     } catch (e) {
//       console.error('Refresh failed', e)
//     }
    
//     return false
//   }
// }

// export const api = new MemoryBookAPI()




// src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

class MemoryBookAPI {
  private accessToken: string | null = null
  
  constructor() {
    this.accessToken = localStorage.getItem('access_token')
  }
  
  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers
    }
    
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    })
    
    if (response.status === 401) {
      const refreshed = await this.refreshToken()
      if (refreshed) {
        headers['Authorization'] = `Bearer ${this.accessToken}`
        const retry = await fetch(`${API_URL}${endpoint}`, {
          ...options,
          headers
        })
        return retry.json()
      }
      throw new Error('Session expired. Please login again.')
    }
    
    if (!response.ok) {
      const error = await response.text()
      throw new Error(error)
    }
    
    return response.json()
  }
  
  private async refreshToken(): Promise<boolean> {
    const refresh = localStorage.getItem('refresh_token')
    if (!refresh) return false
    
    try {
      const response = await fetch(`${API_URL}/auth/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh })
      })
      
      if (response.ok) {
        const data = await response.json()
        this.accessToken = data.access
        localStorage.setItem('access_token', data.access)
        return true
      }
    } catch (e) {
      console.error('Refresh failed', e)
    }
    
    return false
  }
  
  // ============ AUTH ============
  
  async register(email: string, password: string, fullName: string): Promise<void> {
    const nameParts = fullName.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || ''
    
    const response = await fetch(`${API_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: email,
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName
      })
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Registration failed')
    }
    
    // Auto-login after registration
    await this.login(email, password)
  }
  
  async login(email: string, password: string): Promise<void> {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password })
    })
    
    if (!response.ok) {
      throw new Error('Invalid email or password')
    }
    
    const data = await response.json()
    this.accessToken = data.access
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
  }
  
  logout(): void {
    this.accessToken = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
  
  async getProfile(): Promise<any> {
    return this.request('/auth/profile/')
  }
  
  // ============ EVENTS ============
  
  async getEvents(): Promise<any[]> {
    return this.request('/events/')
  }
  
  async createEvent(data: {
    title: string
    date: string
    description?: string
  }): Promise<any> {
    return this.request('/events/', {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        date: data.date,
        description: data.description || '',
        is_published: true,
        settings: {
          theme: 'default',
          primary_color: '#d4a574'
        }
      })
    })
  }
  
  async getEvent(id: string): Promise<any> {
    return this.request(`/events/${id}/`)
  }
  
  async updateEvent(id: string, data: any): Promise<any> {
    return this.request(`/events/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }
}

export const api = new MemoryBookAPI()