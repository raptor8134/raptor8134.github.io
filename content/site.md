---
name: James Notley
role: Materials Engineer

# Header
nav: [work, about, contact]
resume:
  label: Resume
  href: /assets/resume.pdf

# Hero (sits on the dark micrograph backdrop; colours are fixed, not themed).
# The wordmark above the headline is the design system's Logotype and is not
# editable here.
hero:
  # One line per line. Wrap a phrase in [[ ]] to paint it spring-green.
  headline: |
    Half scientist,
    half engineer,
    [[all builder]]
  intro: >
    I'm a materials science and engineering student, semiconductor researcher,
    rocketry enthusiast, amateur machinist, and your next hire.
  primaryCta: Latest project
  secondaryCta:
    label: Download Resume
    href: /assets/resume.pdf

# "Selected projects" section
work:
  # Filter tabs. "All" is added automatically. `match` is tested as a
  # substring of each project's tags.
  tabs:
    - { label: Vacuum, match: uhv }
    - { label: Composites, match: composites }

# Contact section + footer
contact:
  blurb: >
    Riverside, CA. Open to roles and collaborations in vacuum systems,
    composites, and materials testing.
  email: jamesnotley@gmail.com
  phone: "(916) 521-4107"
  phoneHref: "+19165214107"
  linkedin: linkedin.com/in/jamesnotley

footer:
  links:
    - { label: LinkedIn, icon: linkedin, href: "https://linkedin.com/in/jamesnotley" }
    - { label: Email, icon: mail, href: "mailto:jamesnotley@gmail.com" }
    - { label: GitHub, icon: github, href: "https://github.com/raptor8134/"}

# Background micrographs for the hero. Leave this out to use every image
# in content/backdrop/ (sorted by filename).
---

<!-- Nothing below the frontmatter is used for site.md. Edit the fields above. -->
