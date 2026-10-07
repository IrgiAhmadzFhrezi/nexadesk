declare global {
  namespace App {
    interface Locals {
      userId?: number;
      user?: {
        id: number;
        name: string;
        email: string;
        role: string;
        departmentId: number;
      };
    }
  }
}

export {};
