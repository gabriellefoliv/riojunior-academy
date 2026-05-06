import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Create Admin
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@riojunior.com.br' },
    update: {},
    create: {
      email: 'admin@riojunior.com.br',
      name: 'Administrador RioJunior',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('Admin user created:', admin.email)

  // Create EJ
  const ejPassword = await bcrypt.hash('ej123', 10)
  const ej = await prisma.user.upsert({
    where: { email: 'contato@suaej.com.br' },
    update: {},
    create: {
      email: 'contato@suaej.com.br',
      name: 'EJ Exemplo',
      password: ejPassword,
      role: 'EJ',
    },
  })
  console.log('EJ user created:', ej.email)

  // Limpar os dados antigos para recriar as trilhas perfeitamente
  await prisma.userProgress.deleteMany()
  await prisma.material.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.module.deleteMany()
  await prisma.axis.deleteMany()

  // Axes
  const axes = [
    { 
      slug: 'time-cultura', 
      title: 'Time e Cultura', 
      description: 'Gestão de pessoas e cultura organizacional', 
      icon: 'Users',
      coverBaseUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    },
    { 
      slug: 'gestao-operacoes', 
      title: 'Gestão e Operações', 
      description: 'Processos e eficiência operacional', 
      icon: 'Briefcase',
      coverBaseUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
    },
    { 
      slug: 'solucoes-negocio', 
      title: 'Soluções e Modelo de Negócio', 
      description: 'Inovação e estruturação do negócio', 
      icon: 'Lightbulb',
      coverBaseUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80'
    },
    { 
      slug: 'vendas-mercado', 
      title: 'Vendas e Mercado', 
      description: 'Estratégias comerciais e prospecção', 
      icon: 'TrendingUp',
      coverBaseUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
    },
    { 
      slug: 'conteudos-extras', 
      title: 'Conteúdos Extras', 
      description: 'Masterclasses, workshops e palestras', 
      icon: 'Star',
      coverBaseUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80'
    },
  ]

  for (const axis of axes) {
    const { coverBaseUrl, ...axisData } = axis;
    const createdAxis = await prisma.axis.create({
      data: axisData,
    })
    console.log(`Axis created: ${createdAxis.title}`)
    
    // Create multiple modules for each axis to populate the carousel
    const numberOfModules = 4;
    for (let i = 1; i <= numberOfModules; i++) {
      const bucketUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://sua-url-publica-r2.com';

      const dummyModule = await prisma.module.create({
        data: {
          title: `Trilha ${i}: ${createdAxis.title} Avançado`,
          description: `Aprofunde seus conhecimentos na trilha ${i} de ${createdAxis.title}.`,
          coverUrl: coverBaseUrl,
          axisId: createdAxis.id,
          lessons: {
            create: [
              {
                // Aula 1: Híbrida (Vídeo + Texto + PDF)
                title: `1. O que é ${createdAxis.title}?`,
                description: 'Uma visão geral em vídeo com material complementar.',
                content: `<h2>Introdução</h2>\n<p>Assista ao vídeo acima para compreender os fundamentos. Após o vídeo, baixe o material de apoio em PDF para aprofundar a sua leitura.</p>\n<p>Na próxima aula, teremos uma leitura obrigatória sobre este tema.</p>`,
                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Dummy video
                materials: {
                  create: [
                    { title: 'Material de Apoio Oficial', type: 'PDF', url: `${bucketUrl}/trilhas/${axis.slug}/modulo-${i}/apoio.pdf` },
                    { title: 'Planilha Exemplo', type: 'Planilha', url: `${bucketUrl}/trilhas/${axis.slug}/modulo-${i}/exemplo.xlsx` }
                  ]
                }
              },
              {
                // Aula 2: Leitura + Material (Sem vídeo)
                title: `2. Prática em ${createdAxis.title}`,
                description: 'Leitura aprofundada com exercícios.',
                content: `<h2>Colocando os Conceitos à Prova</h2>\n<p>Não há atalhos para a maestria. Este capítulo é focado puramente em leitura técnica.</p>\n<p>Existem três pilares que você precisa entender:</p>\n<ul><li>Planejamento Estratégico</li><li>Execução Diária</li><li>Métricas de Acompanhamento</li></ul>\n<p>Baixe o PDF abaixo para realizar o exercício prático sugerido para a sua EJ.</p>`,
                materials: {
                  create: [
                    { title: 'Caderno de Exercícios', type: 'PDF', url: `${bucketUrl}/trilhas/${axis.slug}/modulo-${i}/exercicios.pdf` }
                  ]
                }
              },
              {
                // Aula 3: Artigo Curto (Sem vídeo, Sem material)
                title: `3. Conclusão Rápida`,
                description: 'Reflexões finais do módulo.',
                content: `<h2>Considerações Finais</h2>\n<p>Você chegou ao fim deste módulo! A sua Empresa Júnior agora tem a capacidade de aplicar as bases do ${createdAxis.title}.</p>\n<p>Parabéns por completar as atividades. Sinta-se à vontade para revisar qualquer material antes de pular para o próximo módulo.</p>`,
              }
            ]
          }
        }
      })
      console.log(`Module created for ${createdAxis.title}: ${dummyModule.title}`)
    }
  }

  console.log('Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
