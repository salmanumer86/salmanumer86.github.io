export const site = {
  url: "https://salmanumer86.github.io",
  name: "Salman Umer",
  title: "Salman Umer | Business Development & Tech Recruitment Specialist",
  description:
    "Salman Umer, Business Development & Tech Recruitment Specialist in Lahore. I help companies hire software engineers, find outsourcing teams and build long-term partnerships. I also write code myself, so I know who delivers.",
  email: "salmanumer.dev@gmail.com",
  phone: "+923010147927",
  phoneDisplay: "+92 301 0147 927",
  linkedin: "https://www.linkedin.com/in/salmanumer",
  company: "Jazzari Software Solutions",
  location: { city: "Lahore", country: "Pakistan", countryCode: "PK" },
  jobTitle: "Business Development & Tech Recruitment Specialist",
} as const;

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();
