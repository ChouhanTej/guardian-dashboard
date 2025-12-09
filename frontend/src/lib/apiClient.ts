import axios, { AxiosInstance } from 'axios';
import { ApiResponse, User, Hazard, SOSAlert } from '@/types/index';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getUser(userId: string): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getHazards(userId: string, limit: number = 50): Promise<ApiResponse<Hazard[]>> {
    try {
      const response = await this.client.get(`/api/hazards`, {
        params: { userId, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getSOSAlerts(userId: string): Promise<ApiResponse<SOSAlert[]>> {
    try {
      const response = await this.client.get(`/api/sos-alerts`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async triggerSOS(userId: string, location: { lat: number; lng: number }): Promise<ApiResponse<SOSAlert>> {
    try {
      const response = await this.client.post(`/api/sos-alerts`, {
        userId,
        location,
        timestamp: new Date(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resolveSOSAlert(alertId: string): Promise<ApiResponse<void>> {
    try {
      const response = await this.client.put(`/api/sos-alerts/${alertId}/resolve`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateLocation(userId: string, lat: number, lng: number): Promise<ApiResponse<void>> {
    try {
      const response = await this.client.post(`/api/users/${userId}/location`, {
        location: { lat, lng },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
