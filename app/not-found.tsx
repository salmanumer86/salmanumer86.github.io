import Link from "next/link";
import { Shell } from "@/components/Shell";

export default function NotFound() {
  return (
    <Shell>
      <div className="nf">
        <div>
          <h1>404</h1>
          <p>That page does not exist, or the role has been taken down.</p>
          <Link className="btn btn-gold" href="/">
            Back to home →
          </Link>
        </div>
      </div>
    </Shell>
  );
}
