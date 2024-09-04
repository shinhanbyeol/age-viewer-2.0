import {
  Box,
  FormLabel,
  Input,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useGraphologyStore } from '../../../stores';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useWorkspaceStore } from '../../../stores/workspaceStore';
import { IPCResponse } from '../../../types';

interface DesignerProps {
  visible: boolean;
}

const Desinger = ({ visible }: DesignerProps) => {
  const { labels } = useGraphologyStore();
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const { desginer, workspaceJsonPath, setDesginer } = useWorkspaceStore();

  const currentSettings = useMemo(
    () =>
      Object(desginer)[selectedLabel]
        ? Object(desginer)[selectedLabel]
        : { color: null, text: null, size: 1 },
    [],
  );

  const handleSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedLabel(e.target.value);
    },
    [setSelectedLabel],
  );

  const handleOnChangeSetting = useCallback(
    (option, value) => {
      const _settings = Object.assign({}, currentSettings);
      _settings[option] = value;
      setDesginer(selectedLabel, _settings);
    },
    [currentSettings],
  );

  const updateSettings = useCallback(() => {
    window.ipc
      .invoke('writeFile/fullPath', {
        filePath: workspaceJsonPath,
        fileData: JSON.stringify({
          ...desginer,
        }),
      })
      .then((res: IPCResponse<null>) => {
        if (res?.error) {
          alert(res.message);
        }
      });
  }, [workspaceJsonPath, desginer]);

  return (
    <VStack
      display={visible ? 'flex' : 'none'}
      align="stretch"
      pt={5}
      pb={5}
      pl={4}
      pr={4}
      h={'100%'}
      direction={['column']}
      spacing={'2rem'}
      divider={<Divider color="black.alpha.80" />}
    >
      <Text fontWeight="bold">Graph Designer</Text>
      <Box>
        <FormLabel>Labels</FormLabel>
        <Select onChange={handleSelect}>
          {labels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </Select>
      </Box>

      <Box>
        <FormLabel>Color</FormLabel>
        <Input
          type="color"
          // defaultValue={currentSettings.color}
          onChange={(e) => {
            handleOnChangeSetting('color', e.target.value);
          }}
        />
      </Box>

      <Box>
        <FormLabel>Text</FormLabel>
        <Input
          type="text"
          // defaultValue={currentSettings.text ?? ''}
          onChange={(e) => {
            handleOnChangeSetting('color', e.target.value);
          }}
        />
      </Box>

      <Box>
        <FormLabel>Size</FormLabel>
        <Slider
          min={1}
          max={10}
          aria-label="slider-ex-1"
          // defaultValue={currentSettings.size ?? 1}
          onChange={(e) => {
            handleOnChangeSetting('size', Number(e));
          }}
        >
          <SliderTrack backgroundColor="black.alpha.20">
            <SliderFilledTrack backgroundColor="black" />
          </SliderTrack>
          <SliderThumb backgroundColor="black" />
        </Slider>
      </Box>
      <Box>
        {workspaceJsonPath}
        <br />
        {JSON.stringify(desginer)}
      </Box>
    </VStack>
  );
};

export default memo(Desinger);
