import React from "react";
import {
  Flex, Heading
} from "@chakra-ui/react";

export function ConnectBanner() {
  return (
    <Flex justifyContent="center" alignItems="center" flex={1}>
      <Heading size="lg" isTruncated>Please connect wallet....</Heading>
    </Flex>
  );
};
