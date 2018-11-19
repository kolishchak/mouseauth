import React from 'react'
import { Row, Col, Steps, Icon, Rate, Collapse, Timeline, Card } from 'antd'

const { Step } = Steps
const { Panel } = Collapse

class Home extends React.Component {
  state = {
    stars: 4,
  }

  handleStarsChange = (stars) => {
    this.setState({ stars })
  }

  render() {
    const { stars } = this.state

    const rowStyle = {
      padding: '10px 0',
    }

    return (
      <Row type="flex" justify="center" style={{ padding: '10px 0' }}>
        <Col span="20">
          <Row style={rowStyle}>
            <Steps>
              <Step status="finish" title="Login" icon={<Icon type="user" />} />
              <Step status="finish" title="Verification" icon={<Icon type="solution" />} />
              <Step status="process" title="Personal info" icon={<Icon type="edit" />} />
              <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
            </Steps>
          </Row>
          <Row style={rowStyle}>
            <span>
              <span>Rate us! </span>
              <Rate onChange={this.handleStarsChange} value={stars} />
              {stars && <span className="ant-rate-text">{stars} stars</span>}
            </span>
          </Row>
          <Row style={rowStyle}>
            <Timeline mode="alternate">
              <Timeline.Item>Created at 2014</Timeline.Item>
              <Timeline.Item color="green">10000 users</Timeline.Item>
              <Timeline.Item color="red">Technical crysis at 2016</Timeline.Item>
              <Timeline.Item>Gets P2P connection patent</Timeline.Item>
              <Timeline.Item>Reinvented all systems at 2017</Timeline.Item>
              <Timeline.Item color="green">Best service in the internet award!</Timeline.Item>
            </Timeline>
          </Row>
          <Row style={rowStyle}>
            <Collapse accordion defaultActiveKey={['1']}>
              <Panel header="About us" key="1">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie, nunc ac condimentum gravida, ex purus hendrerit orci, eget mattis sem leo vitae diam. Praesent malesuada justo vel nisl sagittis, sed viverra mi ultrices. Integer suscipit, lorem non rutrum laoreet, magna lacus efficitur ante, sed tempor risus ligula efficitur libero. Maecenas a libero dolor. Vivamus posuere vulputate neque, eu ullamcorper leo aliquet nec. Duis tempor urna arcu, tempor dictum urna lobortis et. Cras eu mattis dui. Praesent aliquet massa at dapibus tincidunt. Fusce condimentum maximus enim eu ornare. Nullam hendrerit porttitor urna, sed egestas neque ultrices sit amet.</p> {/* eslint-disable-line */}
              </Panel>
              <Panel header="Our mission" key="2">
                <p>Nullam viverra aliquet neque vitae lobortis. Duis pulvinar est dui, eget suscipit nisi pharetra in. Nunc fringilla hendrerit eros, quis mattis lacus faucibus ut. Aliquam quis nulla hendrerit, luctus lorem a, pharetra tellus. Duis pellentesque at nisi eu rhoncus. Quisque nisi diam, ornare nec tincidunt vel, venenatis nec augue. Etiam gravida molestie neque nec malesuada. Proin efficitur pretium nisl, non bibendum tortor. Suspendisse sit amet arcu non eros ultricies porttitor. Nunc gravida vitae dui a tincidunt. Duis sit amet lacus augue. Etiam pellentesque augue non neque elementum mattis at a libero. In nec mattis diam.</p> {/* eslint-disable-line */}
              </Panel>
              <Panel header="Benefits" key="3">
                <p>Etiam lacus sem, sodales in erat sed, viverra viverra tellus. Nulla ultricies sit amet arcu in facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus suscipit vehicula lectus et dictum. Quisque lacinia ex a efficitur eleifend. Donec quis finibus metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis efficitur nibh ac ante lobortis, nec euismod nulla vestibulum. Ut eu orci porta, ornare leo sit amet, fringilla leo. Nullam in sollicitudin libero.</p> {/* eslint-disable-line */}
              </Panel>
            </Collapse>
          </Row>
          <Row gutter={16} style={rowStyle}>
            <Col span={8}>
              <Card title="Personal use" bordered={false} hoverable>
                <div>
                  <ul>
                    <li>Up to 1000 requests/day</li>
                    <li>15 Gb of cloud storage</li>
                    <li>Simple security validation</li>
                  </ul>
                </div>
                <div style={{ color: 'goldenrod', fontWeight: 900, textAlign: 'center' }}>Free!</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Business" bordered={false} hoverable>
                <div>
                  <ul>
                    <li>Up to 20000 requests/day</li>
                    <li>500 Gb of cloud storage</li>
                    <li>Mediocre security validation</li>
                  </ul>
                </div>
                <div style={{ color: 'goldenrod', fontWeight: 900, textAlign: 'center' }}>25$/month</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Corporate use" bordered={false} hoverable>
                <div>
                  <ul>
                    <li>Up to 50000 requests/day</li>
                    <li>1 Tb of cloud storage</li>
                    <li>Best security validation</li>
                  </ul>
                </div>
                <div style={{ color: 'goldenrod', fontWeight: 900, textAlign: 'center' }}>50$/month</div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Home
