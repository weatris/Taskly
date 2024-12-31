import InfiniteScroll from 'react-infinite-scroll-component';
import Stack from '../../../components/Stack/Stack';

export const Chat = ({ id }: { id: string }) => {
  return (
    <Stack className="w-full h-full border-t" direction="col">
      {/* <InfiniteScroll
    dataLength={this.state.items.length}
    next={this.fetchMoreData}
    style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
    inverse={true} //
    hasMore={true}
    loader={<h4>Loading...</h4>}
    scrollableTarget="scrollableDiv"
  >
    {this.state.items.map((_, index) => (
      <div style={style} key={index}>
        div - #{index}
      </div>
    ))}
  </InfiniteScroll> */}
      <></>
    </Stack>
  );
};
