import { PrettyDurationPipe } from './pretty-duration.pipe';

describe('PrettyDurationPipe', () => {
  it('create an instance', () => {
    const pipe = new PrettyDurationPipe();
    expect(pipe).toBeTruthy();
  });
});
