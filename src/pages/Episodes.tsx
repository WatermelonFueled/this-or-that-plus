import { useSigninCheck } from "reactfire"
import EpisodeLink from "../components/EpisodeLink"
import { LogoNoAnim } from "../components/Logo"
import { useEpisodesList } from "../useDatabase"

const Episodes = ():JSX.Element => {
  const episodes = useEpisodesList()

  return (
    <div className="p-resp flex flex-col gap-8 sm:gap-10 lg:gap-12">
      <Welcome />
      <h1 className="heading">
        Episodes
      </h1>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {episodes && episodes.map((ep) => (
          <li className="" key={ep.id}>
            <EpisodeLink episode={ep}>
              <div
                className="p-3 text-lg font-bold transition group-hover:text-purple-900 dark:group-hover:text-purple-100"
              >
                {ep.title}
              </div>
            </EpisodeLink>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Episodes


const Welcome = (): JSX.Element | null => {
  const { data: signInCheckResult } = useSigninCheck()

  return signInCheckResult?.signedIn ? null : (
    <div className="pt-4 flex flex-col gap-4 items-center">
      <h1 className="heading text-5xl dark:text-gray-100">
        Welcome to This or That Plus
        <LogoNoAnim
          className="inline w-12 h-12 ml-2 align-top"
        />
      </h1>
      <p className="">
        Simply answer along with the prompts and see how you compare to the community
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        Issues? Suggestions? contact me&nbsp;
        <a
          className="text-purple-700 dark:text-purple-300"
          href="https://twitter.com/WatermelonFuel"
          target="_blank"
          rel="noreferrer"
        >
          @WatermelonFuel
        </a>
        &nbsp;or email david@watermelonfueled.com
      </p>
    </div>
  )
}
