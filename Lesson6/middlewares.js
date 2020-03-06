import routes from './routes';
import multer from 'multer';

const multerVideo = multer({ dest: 'vidoes/' });
// 우리가 비디오를 업로드하면 server에 있는 folder(videos/)에 업로드된다

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};

// https://expressjs.com/ko/4x/api.html#res.locals
// 전역적으로 사용할 수 있는 변수를 추가하는 방법임
// 모든 템플릿에서 사용가능
// 템플릿,뷰,모든곳에서 사용가능
// next();를 써줘야 다음함수로 넘어간다.

export const uploadVideo = multerVideo.single('videoFile');
// single은 오직 하나의 파일만 upload할 수 있는걸 의미함
// videoFile은 해당 input name을 의미함
// input의 name은 서버로 전달되는 이름을 말함
// 이 미들웨어의 역할은 videoRouter에서 app.post(routes.upload, uploadVideo, postUpload);에 영향을 준다
// 즉 form을 통해 데이터를 주게 되면 videos라는 파일이 만들어지고 그 안에 file이름을 임의로 바꿔놓고 확장자를 없애서 저장한다
