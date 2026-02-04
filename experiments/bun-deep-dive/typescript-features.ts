// experiments/bun-deep-dive/typescript-features.ts

/**
 * Demonstração: Bun executa TypeScript sem transpilar manualmente
 */

// Interfaces
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// Generics
function createUser<T extends User>(data: Omit<T, 'id' | 'createdAt'>): T {
  return {
    ...data,
    id: Math.floor(Math.random() * 10000),
    createdAt: new Date(),
  } as T;
}

// Enums
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

// Type Aliases
type UserWithRole = User & { role: UserRole };

// Async/Await
async function fetchUserData(userId: number): Promise<User> {
  // Simular API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    id: userId,
    name: 'Flávio Luiz Bé',
    email: 'flavio50k@protonmail.com',
    createdAt: new Date(),
  };
}

// Decorators (experimental)
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = async function(...args: any[]) {
    console.log(`Calling ${propertyKey} with:`, args);
    const result = await original.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };
}

class UserService {
  @log
  async getUser(id: number): Promise<User> {
    return fetchUserData(id);
  }
}

// Main execution
(async () => {
  console.log('🚀 TypeScript Features Demo\n');
  
  // Criar usuário
  const newUser = createUser<UserWithRole>({
    name: 'Test User',
    email: 'test@example.com',
    role: UserRole.USER,
  });
  
  console.log('Created user:', newUser);
  
  // Buscar usuário com service
  const service = new UserService();
  const user = await service.getUser(123);
  
  console.log('\n✅ TypeScript executed successfully by Bun!');
})();
