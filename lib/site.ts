export const site = {
  url: "https://salmanumer86.github.io",
  name: "Salman Umer",
  title: "Salman Umer — Tech Recruiter & Business Development Specialist",
  description:
    "Salman Umer — Tech Recruiter & Business Development Specialist based in Lahore. A tech recruiter who writes React. Connecting companies with software engineers, and guiding developers toward the right opportunities.",
  email: "salmanumer.dev@gmail.com",
  phone: "+923010147927",
  phoneDisplay: "+92 301 0147 927",
  linkedin: "https://www.linkedin.com/in/salmanumer",
  company: "Jazzari Software Solutions",
  location: { city: "Lahore", country: "Pakistan", countryCode: "PK" },
  jobTitle: "Tech Recruiter & Business Development Specialist",
} as const;

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();
