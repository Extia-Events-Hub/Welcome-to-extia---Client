import { ThreeDots } from 'react-loader-spinner'
/**
 * Component for displaying a loading spinner or children based on the loading state.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isLoading - Indicates whether the content is loading.
 * @param {React.ElementType} [props.loader=ThreeDots] - The loader component to display while loading.
 * @param {string} [props.wrapperClass] - The CSS class to apply to the wrapper of the loader.
 * @param {string} [props.color='#FC9254'] - The color of the loader.
 * @param {number} [props.height=40] - The height of the loader.
 * @param {number} [props.width=40] - The width of the loader.
 * @param {React.ReactNode} props.children - The children to render when not loading.
 * @returns {React.ReactNode} The loader if `isLoading` is true, otherwise the children.
 */
export function LoadingWrapper({
  isLoading,
  loader: Loader = ThreeDots,
  wrapperClass,
  color = '#FC9254',
  height = 40,
  width = 40,
  children,
}) {
  return isLoading ? <Loader color={color} height={height} width={width} wrapperClass={wrapperClass} /> : children
}
