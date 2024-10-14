import Back from '../back/Back'
import Footer from '../home/footer/Footer';
import Service from '../home/Featured/Featured'
import img from '../images/room.jpg'
export default function Services() {
  return (
    <div>
      <section className="about ">
        <Back  name='ervies' title='Services - All Services' cover={img}/>
        <Service />
        <Footer />
      </section>
    </div>
  )
}
