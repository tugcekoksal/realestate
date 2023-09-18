import Image from "next/image";
import Link from "next/link";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "@/utils/fetchApi";
import Property from "@/components/Property";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  buttonText,
  imgUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center">
    <Image src={imgUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" color="gray.700" paddingTop="3" paddingBottom="3">
        {desc1}
        <br />
        {desc2}
      </Text>

      <Button fontSize="xl" bg={"blue.300"} color={"white"}>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);
export default function Home({ propertyForRent, propertyForSale }) {
  return (
    <Box>
      <Banner
        purpose={"RENT A HOME"}
        title1={"Rental Homes For"}
        title2={"Everyone"}
        desc1={"Explore Apartments, Villas, Homes"}
        desc2={"and more"}
        buttonText={"explore renting"}
        linkName={"/search?purpose=for-rent"}
        imgUrl={
          "https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        }
      />
      <Flex flexWrap={"wrap"} marginTop={5}>
        {propertyForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose={"BUY A HOME"}
        title1={"Find, Buy & Own Your"}
        title2={"Dream Home"}
        desc1={"Explore Apartments, Villas, Homes"}
        desc2={"and more"}
        buttonText={"explore buying"}
        linkName={"/search?purpose=for-sale"}
        imgUrl={
          "https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
        }
      />
      <Flex flexWrap={"wrap"} marginTop={5}>
        {propertyForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );
  return {
    props: {
      propertyForRent: propertyForRent?.hits,
      propertyForSale: propertyForSale?.hits,
    },
  };
}
