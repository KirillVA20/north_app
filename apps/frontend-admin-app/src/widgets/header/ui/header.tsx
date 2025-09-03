import { Modal, UserCircleIcon } from '@test/ui';
import { UserInfo } from '@/widgets/user-info';
import { Box, IconButton } from '@chakra-ui/react';
import { useState } from 'react';

export const Header = () => {
  const [isOpenAuth, setIsOpenAuth] = useState(false);

  return (
    <>
      <Box
        as={'header'}
        padding="20px"
        justifyContent="flex-end"
        display="flex"
      >
        <IconButton
          onClick={() => setIsOpenAuth(true)}
          variant="outline"
          color="gray"
        >
          <UserCircleIcon />
        </IconButton>
      </Box>
      <Modal open={isOpenAuth} onOpenChange={setIsOpenAuth}>
        <UserInfo />
      </Modal>
    </>
  );
};
