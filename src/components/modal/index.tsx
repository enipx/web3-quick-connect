import {
  Flex,
  View,
  Image,
  Text,
  useModeTheme,
  IconButton,
  Tooltip,
  Switch,
  useModeContext,
  Divider,
} from '@oreo-ui/web';
import React, { ChangeEvent } from 'react';

import { ConnectModalContentProps } from './index.types';
import { SupportedWalletOptions, WalletOptionsType } from '../../helpers/base';
import { useMetaMask, usePhantom } from '../../hooks';
import { useModal } from '../../hooks/use-modal';
import { CloseIcon } from '../icons';

export const WalletOption = (props: {
  wallet: WalletOptionsType;
  onClick: ConnectModalContentProps['onSelect'];
}) => {
  const { wallet, onClick } = props;

  const { name, icon, id, disabled } = props.wallet;

  const { isDark, theme } = useModeTheme();

  const bg = isDark ? theme.colors.gray[800] : theme.colors.gray[50];

  const onClickHandler = () => {
    if (!disabled) {
      onClick?.(wallet);
    }
  };

  const disabledOpacity = isDark ? '0.5' : '0.75';

  const renderChildren = () => {
    return (
      <View
        as="button"
        width="100%"
        bg={bg}
        borderRadius="0.75rem"
        mb="md"
        flexCenterY
        p="md"
        onClick={onClickHandler}
        opacity={disabled ? disabledOpacity : '1'}
        style={{ cursor: 'pointer' }}
        id={`${id}-connect-button`}>
        <Image
          src={icon}
          alt={`${name} icon`}
          size="1.8rem"
          borderRadius="full"
        />

        <Text fontSize="sm" fontWeight="600" px="md">
          {name}
        </Text>
      </View>
    );
  };

  if (disabled) {
    return (
      <View>
        <Tooltip
          colorScheme="red"
          label={`${wallet.name} is currently unavailable`}>
          {renderChildren()}
        </Tooltip>
      </View>
    );
  }

  return renderChildren();
};

export const WalletOptionsContent = (props: ConnectModalContentProps) => {
  const { onSelect } = props;

  return (
    <View my="md">
      {SupportedWalletOptions.map((wallet) => {
        return (
          <WalletOption key={wallet.id} wallet={wallet} onClick={onSelect} />
        );
      })}
    </View>
  );
};

const ConnectModalFooter = () => {
  const modeHandler = useModeContext();

  const isDark = modeHandler?.mode === 'dark';

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    modeHandler?.toggle();
  };

  return (
    <View>
      <Divider mt="lg" mb="base" />
      <Flex center column>
        <Switch
          checked={isDark}
          onChange={onChangeHandler}
          key={modeHandler?.mode}
        />

        <Text
          mt="sm"
          fontSize="xs"
          fontWeight="500"
          opacity="0.9"
          textAlign="center">
          {isDark ? 'Dark' : 'Light'} mode
        </Text>
      </Flex>
    </View>
  );
};

export const ConnectModalContent = () => {
  const { hide } = useModal();

  const metamask = useMetaMask();

  const phantom = usePhantom();

  const onSelect = (args: WalletOptionsType) => {
    // ..
    const { id } = args;

    if (id === 'metamask') {
      metamask.initialize();
      return;
    }

    if (id === 'phantom') {
      phantom.initialize();
      return;
    }

    if (id === 'coinbase') {
      return;
    }

    if (id === 'walletconnect') {
    }
  };

  return (
    <View px="lg" py="lg">
      <Flex centerY mb="lg">
        <Text fontWeight="600">Connect a wallet</Text>

        <Flex.Fill />

        <IconButton
          size="xs"
          variant="link"
          onClick={hide}
          icon={<CloseIcon />}
        />
      </Flex>

      <WalletOptionsContent onSelect={onSelect} />

      <ConnectModalFooter />
    </View>
  );
};
