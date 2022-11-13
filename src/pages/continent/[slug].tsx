import { GetStaticProps } from "next";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import Cities from "../../components/Cities";
import Content from "../../components/Content";
import ContinentBanner from "../../components/ContinentBanner";
import Header from "../../components/Header";

import { useRouter } from "next/dist/client/router";
import Loading from "../../components/Loading";

import { continentInfo } from "../../mock/ContinentInfo";

export interface ContinentProps {
  continent: {
    slug: string;
    title: string;
    description: string;
    banner_image: string;
    countries: number;
    languages: number;
    cities: number;
    cities_list: string;
    cities100: {
      city: string;
      country: string;
      thumbnail: string;
      flag: string;
    }[];
  };
}

export default function Continent({ continentInfo }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />;
  }

  const { asPath } = useRouter();

  const continentFiltered = continentInfo.filter(
    (item) => `/continent/${item.continent.slug}` === asPath
  );

  return (
    <Flex direction="column">
      <Head>
        <title>WorldTrip - {continentFiltered[0].continent.title}</title>

        <meta
          property="og:title"
          content={`WorldTrip ${continentFiltered[0].continent.title}`}
        />
        <meta
          property="og:description"
          content={continentFiltered[0].continent.description}
        />
        <meta
          name="twitter:title"
          content={`WorldTrip ${continentFiltered[0].continent.title}`}
        />

        <meta
          name="twitter:image"
          content={continentFiltered[0].continent.banner_image}
        />
        <meta
          name="twitter:image:src"
          content={continentFiltered[0].continent.banner_image}
        />
        <meta
          property="og:image"
          content={continentFiltered[0].continent.banner_image}
        />
        <meta
          property="og:image:secure_url"
          content={continentFiltered[0].continent.banner_image}
        />
      </Head>

      <Header />
      <ContinentBanner continent={continentFiltered[0].continent} />

      <Flex direction="column" maxW="1160px" mx="auto" mb="10" px="1rem">
        <Content continent={continentFiltered[0].continent} />
        <Cities continent={continentFiltered[0].continent} />
      </Flex>
    </Flex>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      continentInfo,
    },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
