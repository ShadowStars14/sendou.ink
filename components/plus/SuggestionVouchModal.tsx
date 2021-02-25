import {
  Button,
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  suggestionFullSchema,
  SUGGESTION_DESCRIPTION_LIMIT,
} from "lib/validators/suggestion";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserSelector from "components/common/UserSelector";
import useMutation from "hooks/useMutation";

interface Props {
  canVouch: boolean;
  canSuggest: boolean;
  userPlusMembershipTier?: number;
}

type FormData = z.infer<typeof suggestionFullSchema>;

const SuggestionVouchModal: React.FC<Props> = ({
  canVouch,
  canSuggest,
  userPlusMembershipTier,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, errors, register, watch, control } = useForm<FormData>({
    resolver: zodResolver(suggestionFullSchema),
  });
  const { onSubmit, sending } = useMutation({
    onSuccess: () => setIsOpen(false),
    route: "plus/suggestions",
    mutationKey: "plus/suggestions",
    successText: "New suggestion submitted",
  });

  const watchDescription = watch("description", "");

  if (!canVouch && !canSuggest) return null;

  const getButtonText = () => {
    if (canSuggest && canVouch) return "Add new suggestion or vouch";
    if (canVouch) return "Vouch";

    return "Add new suggestion";
  };

  if (!userPlusMembershipTier) return null;

  return (
    <>
      <Button
        size="sm"
        mb={4}
        onClick={() => setIsOpen(true)}
        data-cy="suggestion-button"
      >
        {getButtonText()}
      </Button>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="xl"
          closeOnOverlayClick={false}
        >
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Adding a new suggestion or vouch</ModalHeader>
              <ModalCloseButton borderRadius="50%" />
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody pb={2}>
                  <FormLabel>Tier</FormLabel>
                  <Controller
                    name="tier"
                    control={control}
                    defaultValue={userPlusMembershipTier}
                    render={({ value, onChange }) => (
                      <Select
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                      >
                        {userPlusMembershipTier === 1 && (
                          <option value="1">+1</option>
                        )}
                        {userPlusMembershipTier <= 2 && (
                          <option value="2">+2</option>
                        )}
                        {false && <option value="3">+3</option>}
                      </Select>
                    )}
                  />

                  <FormControl isInvalid={!!errors.suggestedId}>
                    <FormLabel mt={4}>User</FormLabel>
                    <Controller
                      name="suggestedId"
                      control={control}
                      render={({ value, onChange }) => (
                        <UserSelector
                          value={value}
                          setValue={onChange}
                          isMulti={false}
                          maxMultiCount={undefined}
                        />
                      )}
                    />
                    <FormErrorMessage>
                      {errors.suggestedId?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel mt={4}>Region</FormLabel>
                    <Select
                      name="region"
                      ref={register}
                      data-cy="region-select"
                    >
                      <option value="NA">NA</option>
                      <option value="EU">EU</option>
                    </Select>
                    <FormHelperText>
                      If the player isn't from either region then choose the one
                      they play most commonly with.
                    </FormHelperText>
                  </FormControl>

                  <FormControl isInvalid={!!errors.description}>
                    <FormLabel htmlFor="description" mt={4}>
                      Description
                    </FormLabel>
                    <Textarea
                      name="description"
                      ref={register}
                      data-cy="description-textarea"
                    />
                    <FormHelperText>
                      {(watchDescription ?? "").length}/
                      {SUGGESTION_DESCRIPTION_LIMIT}
                    </FormHelperText>
                    <FormErrorMessage>
                      {errors.description?.message}
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    mr={3}
                    type="submit"
                    isLoading={sending}
                    data-cy="submit-button"
                  >
                    Save
                  </Button>
                  <Button onClick={() => setIsOpen(false)} variant="outline">
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
    </>
  );
};

export default SuggestionVouchModal;
