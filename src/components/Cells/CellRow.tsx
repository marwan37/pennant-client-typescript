import { CodeCellType, MarkdownCellType } from '@/CellTypes';
import { Box, Divider, Stack } from '../../utils/MuiImports';
import CodeCell from '../Code/CodeCell';
import MarkdownCell from '../Markdown/MarkdownCell';
import { CellPosAvatar } from '../UI/StyledComponents';

interface CellRowProps {
  cell: MarkdownCellType | CodeCellType;
  index: number;
}

const CellRow = ({ cell, index }: CellRowProps) => {
  const id = cell.get('id');
  const type = cell.get('type');

  return (
    <Box width='100%'>
      <Box>
        <Stack
          direction='row'
          alignItems='center'
          sx={{
            width: '75%',
            mx: 'auto'
          }}>
          <Box display='flex' alignItems='center' width='100%' sx={{ ml: -2 }}>
            <Divider flexItem orientation='vertical' sx={{ mr: 3, zIndex: 3 }}>
              <CellPosAvatar index={index + 1} />
            </Divider>
            <Box alignItems='center' sx={{ flexGrow: 1, position: 'relative' }}>
              {type === 'markdown' && <MarkdownCell id={id} cell={cell as MarkdownCellType} />}
              {type === 'code' && <CodeCell key={id} cellId={id} cell={cell as CodeCellType} />}
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default CellRow;
