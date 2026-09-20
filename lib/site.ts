export const site = {
  url: "https://salmanumer86.github.io",
  name: "Salman Umer",
  title: "Salman Umer — Business Development & Tech Recruitment Specialist",
  description:
    "Salman Umer — Business Development & Tech Recruitment Specialist, Lahore. I connect companies with the right technology talent, outsourcing teams and long-term partnerships — and I write code myself, so I know who delivers.",
  email: "salmanumer.dev@gmail.com",
  phone: "+923010147927",
  phoneDisplay: "+92 301 0147 927",
  linkedin: "https://www.linkedin.com/in/salmanumer",
  company: "Jazzari Software Solutions",
  location: { city: "Lahore", country: "Pakistan", countryCode: "PK" },
  jobTitle: "Business Development & Tech Recruitment Specialist",
} as const;

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();
