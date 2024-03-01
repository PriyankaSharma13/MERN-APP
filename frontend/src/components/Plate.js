// import React from 'react';
// import { Plate, PlateContent } from '@udecode/plate-common';
// import { Editor } from '@/components/plate-ui/editor';

 
// export default function BasicEditor() {
//   return (
//     <Plate>
//       <PlateContent placeholder="Type..." />
//       <Editor placeholder="Type..." />
//     </Plate>
    
//   );
// }
// import { createPlateUI } from '@/plate/create-plate-ui';
// import { createBasicElementsPlugin } from '@udecode/plate-basic-elements';
// import { createBasicMarksPlugin } from '@udecode/plate-basic-marks';
// import { createPlugins, Plate } from '@udecode/plate-common';
 
// import { Editor } from '@/components/plate-ui/editor';
// import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
// import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
 
// export function EditorDefault() {
//   const plugins = createPlugins(
//     [createBasicElementsPlugin(), createBasicMarksPlugin()],
//     { components: createPlateUI() }
//   );
 
//   return (
//     <div className="mt-[72px] p-10">
//       <Plate plugins={plugins}>
//         <Editor placeholder="Type your message here." />
 
//         <FloatingToolbar>
//           <FloatingToolbarButtons />
//         </FloatingToolbar>
//       </Plate>
//     </div>
//   );
// }
