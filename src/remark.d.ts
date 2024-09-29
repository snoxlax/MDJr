declare module 'remark' {
  import { Processor } from 'unified';

  export default function remark(): Processor;
}
