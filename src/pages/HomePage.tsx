import { useState } from 'react';
import { Terminal } from '../components/Terminal';
import { ScrollReveal } from '../components/ScrollReveal';
import { SectionLabel } from '../components/SectionLabel';
import { BentoGrid, BentoCell } from '../components/BentoGrid';
import { CountUp } from '../components/CountUp';
import { FeaturedProject } from '../components/FeaturedProject';
import { Timeline, TimelineItem } from '../components/Timeline';
import { useSubtitleRotation } from '../hooks/useSubtitleRotation';
import { useScrollReveal } from '../hooks/useScrollReveal';

const GITHUB_URL = 'https://github.com/NelsonSDE';
const LINKEDIN_URL = 'https://www.linkedin.com/in/nelson-riera-76421879/';
const EMAIL = 'nelsonr.sde@gmail.com';

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconLink({ href, label, icon, external = true }: { href: string; label: string; icon: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex items-center gap-2 px-5 py-2.5 rounded-pill text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
      style={{
        color: 'var(--text-secondary)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--text-primary)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--text-secondary)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.background = 'transparent';
      }}
    >
      {icon}
      {label}
      {external && <span className="sr-only">(opens in new tab)</span>}
    </a>
  );
}

function HeroSection() {
  const subtitle = useSubtitleRotation();

  return (
    <section className="snap-section flex items-center py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <p className="text-base md:text-lg lg:text-xl font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>
              {subtitle}
              <span
                className="inline-block w-[2px] h-[1.1em] ml-0.5 align-text-bottom animate-blink"
                style={{ background: 'var(--accent)' }}
              />
            </p>

            <h1
              className="font-display font-bold tracking-[-0.04em] leading-none mb-5"
              style={{
                fontSize: 'clamp(48px, 8vw, 96px)',
                background: 'linear-gradient(to right, #60a5fa, #67e8f9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Nelson{'\n'}Riera
            </h1>

            <p
              className="text-lg md:text-xl lg:text-2xl mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              Curious engineer. Hard problems. Real impact.
            </p>

            <div className="flex flex-wrap gap-3">
              <IconLink href={GITHUB_URL} label="GitHub" icon={<GithubIcon />} />
              <IconLink href={LINKEDIN_URL} label="LinkedIn" icon={<LinkedInIcon />} />
              <IconLink href={`mailto:${EMAIL}`} label="Email" icon={<EmailIcon />} external={false} />
            </div>

            {/* Scroll indicator */}
            <div className="mt-12 flex flex-col items-start gap-1 opacity-40 animate-bounce" style={{ animationDuration: '2s' }}>
              <ChevronDown />
            </div>
          </div>

          {/* Right: Terminal */}
          <div className="hidden lg:block">
            <Terminal />
          </div>
        </div>

        {/* Mobile terminal */}
        <div className="lg:hidden mt-8">
          <Terminal />
        </div>
      </div>
    </section>
  );
}

function TechPill({ label }: { label: string }) {
  return (
    <span
      className="font-mono text-xs font-medium px-3 py-1.5 rounded-md transition-colors duration-200"
      style={{
        color: 'var(--text-secondary)',
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={e => {
        if (window.matchMedia('(hover: hover)').matches) {
          e.currentTarget.style.color = 'var(--accent)';
          e.currentTarget.style.borderColor = 'var(--accent-glow)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--text-secondary)';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {label}
    </span>
  );
}

function StatCell({ end, suffix, label, delay = 0 }: { end: number; suffix?: string; label: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <BentoCell>
      <ScrollReveal delay={delay}>
        <div ref={ref}>
          <div className="text-4xl md:text-5xl" style={{ color: 'var(--text-primary)', lineHeight: 1 }}>
            <CountUp end={end} suffix={suffix} trigger={isVisible} />
          </div>
          <div className="text-sm font-medium mt-2" style={{ color: 'var(--text-muted)' }}>{label}</div>
        </div>
      </ScrollReveal>
    </BentoCell>
  );
}

function AboutSection() {
  return (
    <section id="about" className="snap-section py-24 md:py-32 flex flex-col justify-center" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <ScrollReveal>
          <SectionLabel number="01" label="ABOUT" />
          <h2 id="about-heading" className="text-3xl md:text-4xl font-semibold tracking-tight mb-12 md:mb-16" style={{ color: 'var(--text-primary)' }}>
            At a glance
          </h2>
        </ScrollReveal>

        <BentoGrid>
          <StatCell end={8} suffix="+" label="Years Shipping Code" delay={0} />
          <StatCell end={6} label="Companies Worldwide" delay={50} />

          <BentoCell span={2}>
            <ScrollReveal delay={100}>
              <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Core Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'React', 'Node.js', 'NestJS', 'AWS', 'MongoDB', 'PostgreSQL', 'Docker'].map(t => (
                  <TechPill key={t} label={t} />
                ))}
              </div>
            </ScrollReveal>
          </BentoCell>

          <BentoCell span={2}>
            <ScrollReveal delay={120}>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                I chase hard problems because that's where the growth is. From scaling systems for a million users to building AI agents that ship code faster — I'm drawn to work that pushes me forward and creates real value for the people who use it. I believe the best engineering comes from curiosity, ownership, and building things you'd actually want to use yourself.
              </p>
            </ScrollReveal>
          </BentoCell>

          <BentoCell span={2}>
            <ScrollReveal delay={150}>
              <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Building with AI</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Custom AI agents and agentic workflows in production at Trust & Will. Claude Code, reusable skills, automated development pipelines.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Claude Code', 'AI Agents', 'Agentic Workflows'].map(t => (
                  <TechPill key={t} label={t} />
                ))}
              </div>
            </ScrollReveal>
          </BentoCell>

          <BentoCell>
            <ScrollReveal delay={170}>
              <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Languages</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Spanish <span style={{ color: 'var(--text-muted)' }}>(native)</span>
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                English <span style={{ color: 'var(--text-muted)' }}>(C1)</span>
              </p>
            </ScrollReveal>
          </BentoCell>

          <BentoCell>
            <ScrollReveal delay={190}>
              <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Education</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                M.Sc. Computer Science
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                TSJ — In progress
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                B.Eng. Telematic Engineering
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                IPN — UPIITA
              </p>
            </ScrollReveal>
          </BentoCell>

          <BentoCell span={2}>
            <ScrollReveal delay={210}>
              <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Thesis Project</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                "Auxiliary system for the mobility of people with visual disabilities" — mapping Mexico City's subway for visually impaired users using Android, Node.js, Firebase & AWS.
              </p>
            </ScrollReveal>
          </BentoCell>
        </BentoGrid>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [showEarlier, setShowEarlier] = useState(false);

  return (
    <section id="experience" className="snap-section py-24 md:py-32" aria-labelledby="experience-heading">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <ScrollReveal>
          <SectionLabel number="03" label="EXPERIENCE" />
          <h2 id="experience-heading" className="text-3xl md:text-4xl font-semibold tracking-tight mb-12 md:mb-16" style={{ color: 'var(--text-primary)' }}>
            Where I've been
          </h2>
        </ScrollReveal>

        <Timeline>
          <TimelineItem
            role="Senior Software Engineer"
            company="PWC / Kunai — Capital One → Trust & Will"
            date="06/2024 — Present"
            activities={[
              'Built graph data models and queries in Amazon Neptune for relationship-driven use cases',
              'Led backend modernization migrating from Express.js to NestJS',
              'Built custom AI agents and reusable skills to automate development tasks with Claude Code',
              'Contributed to migrating a legacy Angular app to React',
            ]}
            highlights={['AI Agents', 'Claude Code', 'Amazon Neptune', 'MFE Migration', 'Angular → React']}
            isCurrent
            delay={0}
          />
          <TimelineItem
            role="Full Stack Developer"
            company="Turing — Kasa"
            date="12/2023 — 06/2024"
            activities={[
              'Developed NestJS microservices with AWS for managing Kasa reservations at scale',
              'Created shared npm packages to reduce code duplication across microservices',
              'Utilized AWS CDK for infrastructure as code enabling rapid deployment',
            ]}
            highlights={['NestJS Microservices', 'AWS CDK', 'Shared NPM Packages', 'Jest']}
            delay={100}
          />
          <TimelineItem
            role="Full Stack Developer"
            company="AgileEngine"
            date="11/2022 — 12/2023"
            activities={[
              'Built a B2B SaaS data privacy platform from the ground up',
              'Designed RESTful APIs with Node.js and Fastify, containerized with Docker',
              'Developed SDKs and integration bridges for customer platform adoption',
            ]}
            highlights={['B2B SaaS Platform', 'Fastify', 'Docker', 'SDKs']}
            delay={200}
          />

          {/* Expand button */}
          {!showEarlier && (
            <div className="pl-8 mt-4">
              <button
                onClick={() => setShowEarlier(true)}
                className="inline-flex items-center gap-2 text-sm font-medium py-2.5 px-5 rounded-lg cursor-pointer transition-all duration-200"
                style={{
                  color: 'var(--accent)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent-glow)';
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
                aria-expanded={false}
              >
                View earlier career ↓
              </button>
            </div>
          )}

          {/* Earlier career */}
          {showEarlier && (
            <>
              <TimelineItem
                role="Node.js Developer"
                company="Globant"
                date="12/2020 — 11/2022"
                activities={[
                  'Designed micro-applications with modular architecture handling over 1M+ users',
                  'Created and managed AWS Lambda functions for asynchronous event processing',
                ]}
                highlights={['1M+ Users', 'AWS Lambda', 'SOLID Principles', 'CI/CD']}
                delay={0}
              />
              <TimelineItem
                role="Software Developer"
                company="IBM"
                date="06/2019 — 12/2020"
                activities={[
                  'Optimized account opening process, reducing time by over 90%',
                  'Integrated microservices architecture enabling seamless scaling',
                ]}
                highlights={['90% Process Optimization', 'Microservices', 'Java / Groovy']}
                delay={100}
              />
              <TimelineItem
                role="Frontend Developer Consultant"
                company="IPN"
                date="09/2017 — 06/2019"
                activities={[
                  'Developed a loan application platform with intuitive form-based interface',
                  'Integrated third-party API services for automated client identification',
                ]}
                highlights={['Loan Platform', 'Angular', 'Google Analytics']}
                delay={200}
              />

              {/* Education */}
              <div className="pl-8 mt-4">
                <ScrollReveal delay={300}>
                  <div
                    className="rounded-card p-6"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                  >
                    <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      Telematic Engineering — IPN (2014–2019)
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Thesis: "Auxiliary system for the mobility of people with visual disabilities" — mapping Mexico City's subway for visually impaired users using Android, Node.js, Firebase & AWS.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </>
          )}
        </Timeline>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div>
      <HeroSection />

      {/* // 01. ABOUT */}
      <AboutSection />

      {/* // 02. PROJECTS */}
      <section id="projects" className="snap-section py-24 md:py-32 flex flex-col justify-center" aria-labelledby="projects-heading">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <SectionLabel number="02" label="PROJECTS" />
            <h2 id="projects-heading" className="text-3xl md:text-4xl font-semibold tracking-tight mb-12 md:mb-16" style={{ color: 'var(--text-primary)' }}>
              What I've built
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FeaturedProject
              title="Challenge Tracker"
              description="A multi-tenant SaaS accountability tool for group challenges. Real-time debt tracking, photo proof verification, and configurable rules — built on a micro-frontend architecture."
              metrics={['Module Federation', 'Real-time Sync', 'Clerk Auth', 'S3 Uploads']}
              liveUrl="/projects/challenge-tracker"
              architectureUrl="/architecture"
              isLive
            />
          </ScrollReveal>
        </div>
      </section>

      {/* // 03. EXPERIENCE */}
      <ExperienceSection />

      {/* Footer will be added in Epic 6 */}
    </div>
  );
}
