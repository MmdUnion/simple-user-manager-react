import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/modal'
import { User } from '../schema/user'
import { useState } from 'react'

const EditUser = (props: { updateUser: (updatedUser: User) => void; user: User }): JSX.Element => {
  const { updateUser, user } = props
  const [editUser, setEditUser] = useState<User>({
    id: user.id,
    name: user.name,
    family: user.family,
    nationalCode: user.nationalCode
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleInput = (key: string, value: string): void => {
    setEditUser({ ...editUser, [key]: value })
  }
  const handleSubmit = (closeModal: () => void) => {
    updateUser(editUser)
    closeModal()
  }

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 cursor-pointer text-yellow-700"
        onClick={onOpen}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>

      <Modal
        className="overflow-auto max-h-full max-w-[60rem] mx-4"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">ویرایش</ModalHeader>
              <ModalBody className="p-10">
                <div className="flex flex-col md:flex-row gap-3 border-1 border-black rounded-lg p-5 justify-center items-center">
                  <Input
                    label="نام"
                    type="text"
                    labelPlacement="inside"
                    value={editUser.name}
                    onValueChange={(value) => handleInput('name', value)}
                  />
                  <Input
                    label="نام خانوادگی"
                    type="text"
                    labelPlacement="inside"
                    value={editUser.family}
                    onValueChange={(value) => handleInput('family', value)}
                  />
                  <Input
                    label="کدملی"
                    type="text"
                    labelPlacement="inside"
                    value={editUser.nationalCode}
                    onValueChange={(value) => handleInput('nationalCode', value)}
                  />
                  <ModalFooter className="flex flex-row-reverse">
                    <Button color="danger" onPress={onClose}>
                      بستن
                    </Button>
                    <Button color="primary" onPress={() => handleSubmit(onClose)}>
                      تایید
                    </Button>
                  </ModalFooter>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditUser
