import { PrismaClient } from '@prisma/client';
import { scryptSync, randomBytes } from 'crypto';
import readline from 'readline';

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('--- Promena lozinke administratora / Change Admin Password ---');

rl.question('Unesite email administratora (default: admin@demostore.com): ', async (emailInput) => {
  const email = emailInput.trim() || 'admin@demostore.com';
  
  rl.question('Unesite novu lozinku: ', async (password) => {
    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      console.error('Greška: Lozinka ne može biti prazna!');
      rl.close();
      await prisma.$disconnect();
      process.exit(1);
    }
    
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });
      
      if (!user) {
        console.error(`Greška: Korisnik sa emailom ${email} nije pronađen.`);
        rl.close();
        await prisma.$disconnect();
        process.exit(1);
      }
      
      const hashedPassword = hashPassword(trimmedPassword);
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword }
      });
      
      console.log(`Uspešno promenjena lozinka za korisnika: ${email}`);
    } catch (error) {
      console.error('Greška pri promeni lozinke:', error);
    } finally {
      await prisma.$disconnect();
      rl.close();
    }
  });
});
