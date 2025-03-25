<?php

/**
 * Returns the importmap for this application.
 *
 * - "path" is a path inside the asset mapper system. Use the
 *     "debug:asset-map" command to see the full list of paths.
 *
 * - "entrypoint" (JavaScript only) set to true for any module that will
 *     be used as an "entrypoint" (and passed to the importmap() Twig function).
 *
 * The "importmap:require" command can be used to add new entries to this file.
 */
return [
    'app' => [
        'path' => './assets/app.js',
        'entrypoint' => true,
    ],
    '@hotwired/stimulus' => [
        'version' => '3.2.2',
    ],
    '@symfony/stimulus-bundle' => [
        'path' => './vendor/symfony/stimulus-bundle/assets/dist/loader.js',
    ],
    '@hotwired/turbo' => [
        'version' => '7.3.0',
    ],
    'react' => [
        'version' => '19.0.0',
    ],
    'react-dom' => [
        'version' => '19.0.0',
    ],
    'axios' => [
        'version' => '1.8.4',
    ],
    '@mui/material' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/capitalize' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/createChainedFunction' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/debounce' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/deprecatedPropType' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/isMuiElement' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/ownerDocument' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/ownerWindow' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/requirePropFactory' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/setRef' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/useEnhancedEffect' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/useId' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/unsupportedProp' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/useControlled' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/useEventCallback' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/useForkRef' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/getScrollbarSize' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/formatMuiErrorMessage' => [
        'version' => '6.4.8',
    ],
    '@mui/system' => [
        'version' => '6.4.8',
    ],
    '@mui/system/createBreakpoints' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/deepmerge' => [
        'version' => '6.4.8',
    ],
    '@mui/system/colorManipulator' => [
        'version' => '6.4.8',
    ],
    '@mui/system/spacing' => [
        'version' => '6.4.8',
    ],
    '@mui/system/cssVars' => [
        'version' => '6.4.8',
    ],
    '@mui/system/styleFunctionSx' => [
        'version' => '6.4.8',
    ],
    '@mui/system/createTheme' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/generateUtilityClass' => [
        'version' => '6.4.8',
    ],
    '@mui/system/useThemeProps' => [
        'version' => '6.4.8',
    ],
    '@mui/system/createStyled' => [
        'version' => '6.4.8',
    ],
    'react/jsx-runtime' => [
        'version' => '19.0.0',
    ],
    '@mui/system/InitColorSchemeScript' => [
        'version' => '6.4.8',
    ],
    '@mui/utils' => [
        'version' => '6.4.8',
    ],
    'prop-types' => [
        'version' => '15.8.1',
    ],
    'clsx' => [
        'version' => '2.1.1',
    ],
    '@mui/utils/composeClasses' => [
        'version' => '6.4.8',
    ],
    '@mui/system/DefaultPropsProvider' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/generateUtilityClasses' => [
        'version' => '6.4.8',
    ],
    'react-is' => [
        'version' => '19.0.0',
    ],
    '@mui/utils/chainPropTypes' => [
        'version' => '6.4.8',
    ],
    'react-transition-group' => [
        'version' => '4.4.5',
    ],
    '@mui/utils/useTimeout' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/elementTypeAcceptingRef' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/integerPropType' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/appendOwnerState' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/resolveComponentProps' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/mergeSlotProps' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/refType' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/isFocusVisible' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/useLazyRef' => [
        'version' => '6.4.8',
    ],
    '@mui/material/utils' => [
        'version' => '6.4.8',
    ],
    '@mui/system/RtlProvider' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/HTMLElementType' => [
        'version' => '6.4.8',
    ],
    '@popperjs/core' => [
        'version' => '2.11.8',
    ],
    '@mui/utils/useSlotProps' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/elementAcceptingRef' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/getReactElementRef' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/usePreviousProps' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/resolveProps' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/getValidReactChildren' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/extractEventHandlers' => [
        'version' => '6.4.8',
    ],
    '@mui/system/Grid' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/exactProp' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/getDisplayName' => [
        'version' => '6.4.8',
    ],
    '@mui/system/useMediaQuery' => [
        'version' => '6.4.8',
    ],
    '@mui/system/style' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/clamp' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/visuallyHidden' => [
        'version' => '6.4.8',
    ],
    '@mui/styled-engine' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/ClassNameGenerator' => [
        'version' => '6.4.8',
    ],
    '@mui/private-theming' => [
        'version' => '6.4.8',
    ],
    '@babel/runtime/helpers/esm/extends' => [
        'version' => '7.26.10',
    ],
    '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose' => [
        'version' => '7.26.10',
    ],
    '@babel/runtime/helpers/esm/inheritsLoose' => [
        'version' => '7.26.10',
    ],
    'dom-helpers/addClass' => [
        'version' => '5.2.1',
    ],
    'dom-helpers/removeClass' => [
        'version' => '5.2.1',
    ],
    '@babel/runtime/helpers/esm/assertThisInitialized' => [
        'version' => '7.26.10',
    ],
    '@emotion/styled' => [
        'version' => '11.14.0',
    ],
    '@emotion/serialize' => [
        'version' => '1.3.3',
    ],
    '@emotion/react' => [
        'version' => '11.14.0',
    ],
    '@emotion/cache' => [
        'version' => '11.14.0',
    ],
    '@emotion/sheet' => [
        'version' => '1.4.0',
    ],
    '@emotion/use-insertion-effect-with-fallbacks' => [
        'version' => '1.2.0',
    ],
    '@emotion/utils' => [
        'version' => '1.4.2',
    ],
    '@emotion/is-prop-valid' => [
        'version' => '1.3.1',
    ],
    '@babel/runtime/helpers/extends' => [
        'version' => '7.26.9',
    ],
    '@emotion/hash' => [
        'version' => '0.9.2',
    ],
    '@emotion/unitless' => [
        'version' => '0.10.0',
    ],
    '@emotion/memoize' => [
        'version' => '0.9.0',
    ],
    '@emotion/weak-memoize' => [
        'version' => '0.4.0',
    ],
    'hoist-non-react-statics' => [
        'version' => '3.3.2',
    ],
    'stylis' => [
        'version' => '4.2.0',
    ],
    '@mui/material/styles' => [
        'version' => '6.4.8',
    ],
    '@mui/x-data-grid' => [
        'version' => '7.28.1',
    ],
    '@mui/x-internals/forwardRef' => [
        'version' => '7.28.0',
    ],
    'reselect' => [
        'version' => '5.1.1',
    ],
    '@mui/x-internals/warning' => [
        'version' => '7.28.0',
    ],
    '@mui/x-internals/fastObjectShallowCompare' => [
        'version' => '7.28.0',
    ],
    'use-sync-external-store/shim' => [
        'version' => '1.4.0',
    ],
    '@mui/x-internals/fastMemo' => [
        'version' => '7.28.0',
    ],
    '@mui/material/InputBase' => [
        'version' => '6.4.8',
    ],
    '@mui/material/Autocomplete' => [
        'version' => '6.4.8',
    ],
    '@mui/material/MenuList' => [
        'version' => '6.4.8',
    ],
    '@mui/material/ClickAwayListener' => [
        'version' => '6.4.8',
    ],
    '@mui/material/Grow' => [
        'version' => '6.4.8',
    ],
    '@mui/material/Paper' => [
        'version' => '6.4.8',
    ],
    '@mui/material/Popper' => [
        'version' => '6.4.8',
    ],
    '@mui/utils/useOnMount' => [
        'version' => '6.4.8',
    ],
    '@mui/x-internals/reactMajor' => [
        'version' => '7.28.0',
    ],
    '@mui/material/MenuItem' => [
        'version' => '6.4.8',
    ],
    '@mui/material/ListItemIcon' => [
        'version' => '6.4.8',
    ],
    '@mui/material/Skeleton' => [
        'version' => '6.4.8',
    ],
    '@mui/material/ListItemText' => [
        'version' => '6.4.8',
    ],
    '@mui/material/Unstable_TrapFocus' => [
        'version' => '6.4.8',
    ],
    '@mui/material/FormControlLabel' => [
        'version' => '6.4.8',
    ],
    '@mui/material/TextField' => [
        'version' => '6.4.8',
    ],
    '@mui/material/LinearProgress' => [
        'version' => '6.4.8',
    ],
    '@mui/material/CircularProgress' => [
        'version' => '6.4.8',
    ],
    '@mui/material/TablePagination' => [
        'version' => '6.4.8',
    ],
    '@mui/x-internals/isObjectEmpty' => [
        'version' => '7.28.0',
    ],
    '@mui/x-internals/EventManager' => [
        'version' => '7.28.0',
    ],
    '@babel/runtime/helpers/esm/toPropertyKey' => [
        'version' => '7.26.10',
    ],
    '@mui/x-internals/throttle' => [
        'version' => '7.28.0',
    ],
    '@mui/material/Badge' => [
        'version' => '6.4.8',
    ],
    '@mui/material/Checkbox' => [
        'version' => '6.4.8',
    ],
    '@mui/material/Divider' => [
        'version' => '6.4.8',
    ],
    '@mui/material/FormControl' => [
        'version' => '6.4.8',
    ],
    '@mui/material/Select' => [
        'version' => '6.4.8',
    ],
    '@mui/material/Button' => [
        'version' => '6.4.8',
    ],
    '@mui/material/IconButton' => [
        'version' => '6.4.8',
    ],
    '@mui/material/InputAdornment' => [
        'version' => '6.4.8',
    ],
    '@mui/material/Tooltip' => [
        'version' => '6.4.8',
    ],
    '@mui/material/InputLabel' => [
        'version' => '6.4.8',
    ],
    '@mui/material/Chip' => [
        'version' => '6.4.8',
    ],
    '@babel/runtime/helpers/interopRequireWildcard' => [
        'version' => '7.26.10',
    ],
    'webpack' => [
        'version' => '5.98.0',
    ],
    '@symfony/webpack-encore' => [
        'version' => '5.1.0',
    ],
];
