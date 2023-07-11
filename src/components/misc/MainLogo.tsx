import Link from "next/link";
import Image from "next/image"
export default function MainLogo(props: { width: number }) {
  return (
    <Link href="/">
      <Image src="/black_cat.png" width={ props.width } height={ props.width } alt="CATS Logo"/>
    </Link>
  )
}